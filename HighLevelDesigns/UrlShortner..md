# URL Shortener System Design

## Introduction
A URL shortener is a service that converts long URLs into shorter, more manageable links. Popular examples include bit.ly, TinyURL, and t.co. These services are crucial for social media platforms, marketing campaigns, and tracking analytics.

## Requirements

### Functional Requirements
1. Create short URLs from long URLs
    - Support for custom aliases
    - Bulk URL creation for enterprise clients
2. Redirect users to original URL when accessing short URL
    - Handle 404 for expired/invalid URLs
3. Optional custom short URLs
    - Validation for inappropriate content
    - Reserved keywords protection
4. URL expiration (optional)
    - Default TTL (Time To Live)
    - Custom expiration dates
5. Analytics Dashboard
    - Click tracking
    - Geographic data
    - User agent information

### Non-Functional Requirements
1. High Availability (99.99% uptime)
2. Minimal latency for redirections (<100ms)
3. System should be scalable
    - Handle 100M new URLs per month
    - Support 1B redirects per month
4. URLs should be unique and secure
5. Data consistency across data centers

## System Design Components

### API Endpoints
#### URL Management
- `POST /api/shorten` - Create short URL
  ```json
  {
     "longUrl": "string",
     "customAlias": "string?",
     "expirationDate": "datetime?",
     "userId": "string?"
  }
  ```
- `GET /{shortUrl}` - Redirect to original URL
- `DELETE /api/urls/{shortUrl}` - Delete short URL
- `GET /api/urls/analytics/{shortUrl}` - Get URL analytics

### Database Schema
```sql
-- URLs Table
urls_table (
     id BIGINT PRIMARY KEY,
     short_url VARCHAR(8) UNIQUE,
     long_url VARCHAR(2048),
     created_at TIMESTAMP,
     expires_at TIMESTAMP,
     user_id BIGINT,
     click_count BIGINT DEFAULT 0
);

-- Analytics Table
analytics_table (
     id BIGINT PRIMARY KEY,
     url_id BIGINT,
     timestamp TIMESTAMP,
     ip_address VARCHAR(45),
     user_agent TEXT,
     country VARCHAR(2),
     FOREIGN KEY (url_id) REFERENCES urls_table(id)
);
```

### Core Components
1. Load Balancer
    - Round-robin algorithm
    - Health checking
    - SSL termination

2. Web Servers
    - Stateless application servers
    - Rate limiting
    - Request validation

3. Database
    - Primary: PostgreSQL for ACID compliance
    - Read replicas for scaling
    - Partitioning by short_url prefix

4. Cache Layer
    - Redis cluster
    - LRU eviction policy
    - Two-level caching (local + distributed)

5. Analytics Pipeline
    - Kafka for event streaming
    - Elasticsearch for analytics storage
    - Grafana for visualization

## Algorithm
### URL Generation
1. Base62 encoding (a-z, A-Z, 0-9)
    ```python
    def encode(num):
         chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
         base = len(chars)
         result = ""
         while num > 0:
              result = chars[num % base] + result
              num //= base
         return result
    ```

2. Custom URL Handling
    - MD5 hashing for verification
    - Bloom filter for duplicate checking
    - Reserved keyword validation

## Scale Considerations
1. Database Sharding
    - Horizontal partitioning by URL hash
    - Consistent hashing for distribution

2. Caching Strategy
    - Write-through caching
    - Cache warming for popular URLs
    - TTL-based eviction

3. Analytics Processing
    - Asynchronous processing
    - Batch aggregation
    - Real-time metrics using Redis

4. Security Measures
    - Rate limiting per IP/user
    - SQL injection prevention
    - DDOS protection

## Monitoring and Maintenance
1. Health Metrics
    - Request latency
    - Error rates
    - Cache hit ratio

2. Alerting
    - Service degradation
    - Capacity thresholds
    - Security incidents

3. Backup Strategy
    - Regular database backups
    - Cross-region replication
    - Disaster recovery plan