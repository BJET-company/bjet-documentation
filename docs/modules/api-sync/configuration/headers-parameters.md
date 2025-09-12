---
sidebar_position: 5
title: Headers and Parameters
description: Configure custom HTTP headers and URL parameters
---

# Headers and Parameters Configuration

Configure custom HTTP headers and URL parameters for your API synchronization.

## Custom Headers

Add custom headers to your API requests for authentication, content type, or other requirements.

![Headers Configuration](/img/api-sync/headers-config.png)
*Configure custom HTTP headers*

### Common Header Examples

| Header Name | Value | Purpose |
|-------------|-------|---------|
| Content-Type | application/json | Specify JSON content |
| Accept | application/json | Request JSON response |
| X-API-Key | your-api-key | Custom API authentication |
| X-Request-ID | unique-id | Request tracking |

### Adding Headers

1. Navigate to the **Headers** tab in your configuration
2. Click **Add a line**
3. Enter the **Key** (header name)
4. Enter the **Value** (header value)
5. Save the configuration

## URL Parameters

Configure URL parameters for GET requests and query strings.

![Parameters Configuration](/img/api-sync/parameters-config.png)
*Configure URL parameters*

### Parameter Types

- **Query Parameters**: Added to URL as `?key=value`
- **Path Parameters**: Embedded in URL path
- **Filter Parameters**: Used for data filtering

### Common Parameters

| Parameter | Example Value | Description |
|-----------|---------------|-------------|
| page | 1 | Pagination page number |
| limit | 100 | Records per page |
| sort | name | Sort field |
| order | asc | Sort order |
| filter | active=true | Filter criteria |

### Adding Parameters

1. Navigate to the **Parameters** tab
2. Click **Add a line**
3. Enter the **Field** name
4. Select **Domain Operator** if needed
5. Enter the **Value**

## Dynamic Parameters

Use Python scripts to generate dynamic parameter values:

```python
# Example: Add timestamp parameter
import time
params['timestamp'] = str(int(time.time()))

# Example: Add calculated page size
params['page_size'] = min(records_count, 100)
```

## Best Practices

1. **Security**: Never expose sensitive data in URL parameters
2. **Encoding**: Properly encode special characters
3. **Documentation**: Document all required headers
4. **Testing**: Test with various parameter combinations
5. **Validation**: Validate parameter values before sending

## Related Documentation

- [Authentication Configuration](authentication)
- [Field Mapping](field-mapping)
- [Python Scripts](../python-scripts/data-transformation)