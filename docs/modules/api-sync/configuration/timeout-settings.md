---
sidebar_position: 6
title: Timeout Configuration
description: Configure connection and read timeouts for API requests
---

# Timeout Configuration

Configure timeout settings to control how long the system waits for API responses.

## Timeout Types

![Timeout Settings](/img/api-sync/timeout-settings.png)
*Configure connection and read timeouts*

### Connection Timeout

- **Purpose**: Maximum time to establish a connection to the API server
- **Default**: 5 seconds
- **Range**: 1-60 seconds
- **When to increase**: Slow network connections or distant servers

### Read Timeout

- **Purpose**: Maximum time to wait for response data after connection
- **Default**: 15 seconds
- **Range**: 1-300 seconds
- **When to increase**: Large data transfers or slow API processing

## Configuration Steps

1. Navigate to your API configuration
2. Locate the **Timeout Settings** section
3. Set **Connection Timeout in Seconds**
4. Set **Read Timeout in Seconds**
5. Save the configuration

## Recommended Settings

### Fast Local APIs
- Connection Timeout: 2 seconds
- Read Timeout: 5 seconds

### Cloud APIs
- Connection Timeout: 5 seconds
- Read Timeout: 15 seconds

### Slow External APIs
- Connection Timeout: 10 seconds
- Read Timeout: 30 seconds

### Large Data Transfers
- Connection Timeout: 5 seconds
- Read Timeout: 60-300 seconds

## Timeout Handling

### Error Responses

When a timeout occurs, you'll receive:

```json
{
  "status": "error",
  "code": 408,
  "message": "Request Timeout",
  "details": "Connection timeout after 5 seconds"
}
```

### Retry Logic

Implement automatic retry for timeout errors:

```python
import time

max_retries = 3
retry_delay = 2  # seconds

for attempt in range(max_retries):
    try:
        # Make API request
        response = make_request()
        break
    except TimeoutError:
        if attempt < max_retries - 1:
            time.sleep(retry_delay * (attempt + 1))
        else:
            raise
```

## Performance Optimization

### Factors Affecting Timeout

1. **Network Latency**: Physical distance to server
2. **Server Load**: API server processing capacity
3. **Data Volume**: Amount of data being transferred
4. **Request Complexity**: Processing required by the API

### Optimization Tips

1. **Use Pagination**: Break large requests into smaller chunks
2. **Implement Caching**: Cache frequently accessed data
3. **Optimize Queries**: Request only necessary fields
4. **Monitor Performance**: Track average response times
5. **Load Balancing**: Distribute requests across multiple endpoints

## Troubleshooting Timeouts

### Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Frequent connection timeouts | Network issues | Increase connection timeout |
| Read timeouts on large requests | Slow processing | Increase read timeout or use pagination |
| Intermittent timeouts | Server overload | Implement retry logic |
| Consistent timeouts | Firewall/proxy | Check network configuration |

### Debugging Steps

1. Test API endpoint directly (curl/Postman)
2. Check network connectivity
3. Monitor server response times
4. Review API documentation for limits
5. Contact API provider if issues persist

## Best Practices

1. **Start Conservative**: Begin with higher timeouts, then optimize
2. **Monitor Metrics**: Track timeout occurrences
3. **Implement Fallbacks**: Have backup strategies for timeout scenarios
4. **Document Settings**: Record timeout values and reasons
5. **Test Thoroughly**: Test with various network conditions

## Related Documentation

- [Performance Optimization](../performance-optimization)
- [Troubleshooting](../troubleshooting)
- [Error Handling](../api-reference/error-codes)