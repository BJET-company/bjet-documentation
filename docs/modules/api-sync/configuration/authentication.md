---
id: authentication
title: Authentication Setup Guide
sidebar_label: Authentication
description: Complete guide to configuring authentication methods for API synchronization
---

# Authentication Setup Guide

The BJET API Synchronization module supports three authentication methods to secure your API integrations. This guide provides detailed setup instructions for each authentication type.

## Overview

Authentication ensures that only authorized systems can access your API endpoints. The module supports:

- **No Authentication** - For internal or trusted networks
- **Basic Authentication** - Username and password authentication
- **Bearer Token** - Token-based authentication for modern APIs

## Authentication Methods

### 1. No Authentication

Use this method only for:
- Internal APIs on trusted networks
- Development and testing environments
- Public APIs that don't require authentication

#### Configuration

1. Navigate to **Settings → Technical → API Sync Configurations**
2. In the authentication section, select **"None"**
3. Leave authentication fields empty
4. Save the configuration

:::warning Security Notice
No authentication should only be used in secure, internal environments. Never use this for production APIs exposed to the internet.
:::

### 2. Basic Authentication

Basic authentication sends credentials with each request using the HTTP Authorization header.

#### Configuration Steps

1. **Generate Credentials**
   - Create a dedicated API user in your external system
   - Generate a strong password
   - Store credentials securely

2. **Configure in Odoo**
   ```python
   # In API Sync Configuration
   Authentication Type: Basic
   Username: api_user
   Password: ********
   ```

3. **Header Format**
   The module automatically formats the header as:
   ```http
   Authorization: Basic base64(username:password)
   ```

#### Security Best Practices

- Use HTTPS to encrypt credentials in transit
- Rotate passwords regularly
- Use strong, unique passwords
- Monitor authentication logs for suspicious activity

### 3. Bearer Token Authentication

Bearer tokens provide a more secure and flexible authentication method.

#### Configuration Steps

1. **Obtain Token**
   - Generate token from external API provider
   - Or create OAuth2 access token
   - Store token securely

2. **Configure in Odoo**
   ```python
   # In API Sync Configuration
   Authentication Type: Bearer Token
   Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Header Format**
   The module automatically adds:
   ```http
   Authorization: Bearer <token>
   ```

#### Token Management

- **Token Expiration**: Monitor token expiry dates
- **Refresh Tokens**: Implement automatic token refresh if supported
- **Token Rotation**: Regularly rotate tokens for security
- **Secure Storage**: Never commit tokens to version control

## Dynamic Authentication

For advanced scenarios, use Python scripts to generate dynamic authentication:

```python
def compute_auth_header(sync_line):
    """Generate dynamic authentication based on context"""
    import hmac
    import hashlib
    import time
    
    # Example: Generate time-based token
    timestamp = str(int(time.time()))
    secret = sync_line.api_config_id.get_secret_key()
    
    # Create HMAC signature
    signature = hmac.new(
        secret.encode(),
        timestamp.encode(),
        hashlib.sha256
    ).hexdigest()
    
    return {
        'X-Timestamp': timestamp,
        'X-Signature': signature
    }
```

## OAuth 2.0 Integration

For OAuth 2.0 authentication:

### Setup Process

1. **Register Application**
   - Register your Odoo instance with the OAuth provider
   - Obtain Client ID and Client Secret
   - Configure redirect URLs

2. **Token Exchange**
   ```python
   import requests
   
   def get_oauth_token(client_id, client_secret):
       response = requests.post(
           'https://oauth.provider.com/token',
           data={
               'grant_type': 'client_credentials',
               'client_id': client_id,
               'client_secret': client_secret
           }
       )
       return response.json()['access_token']
   ```

3. **Token Storage**
   - Store tokens securely in Odoo
   - Implement automatic refresh before expiry
   - Handle token revocation

## API Key Authentication

Some APIs use custom API key authentication:

### Configuration

1. **Header-based API Key**
   ```python
   # In transformation script
   result['headers'] = {
       'X-API-Key': 'your-api-key-here'
   }
   ```

2. **Query Parameter API Key**
   ```python
   # Append to URL
   url = f"{base_url}?api_key={api_key}"
   ```

## Testing Authentication

### Verification Steps

1. **Test Connection**
   ```bash
   # Basic Auth
   curl -u username:password https://api.example.com/test
   
   # Bearer Token
   curl -H "Authorization: Bearer token" https://api.example.com/test
   ```

2. **Monitor Logs**
   - Check Odoo logs for authentication errors
   - Review external API access logs
   - Verify response codes (401 = Unauthorized)

3. **Troubleshooting**
   - Verify credentials are correct
   - Check token expiration
   - Ensure proper header formatting
   - Verify API endpoint permissions

## Security Recommendations

### Best Practices

1. **Use HTTPS Always**
   - Encrypt all API communications
   - Verify SSL certificates
   - Use TLS 1.2 or higher

2. **Credential Management**
   - Store credentials in environment variables
   - Use Odoo's built-in encryption for sensitive data
   - Never log authentication details

3. **Access Control**
   - Implement IP whitelisting where possible
   - Use rate limiting to prevent abuse
   - Monitor for suspicious authentication patterns

4. **Audit and Compliance**
   - Log all authentication attempts
   - Regular security audits
   - Comply with data protection regulations

## Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid credentials | Verify username/password or token |
| 403 Forbidden | Insufficient permissions | Check API user permissions |
| Token Expired | Token lifetime exceeded | Implement token refresh mechanism |
| Header Format Error | Incorrect header syntax | Review authentication header format |

## Next Steps

- [Configure Field Mapping](./field-mapping) - Map API fields to Odoo fields
- [Set Up Webhooks](./inbound-api) - Configure inbound API endpoints
- [Test Your Integration](../troubleshooting) - Verify authentication is working

## Related Documentation

- [API Configuration Overview](./overview)
- [Inbound API Setup](./inbound-api)
- [Outbound API Setup](./outbound-api)
- [Troubleshooting Guide](../troubleshooting)