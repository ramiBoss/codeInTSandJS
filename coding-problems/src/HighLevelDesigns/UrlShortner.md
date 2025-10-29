## Design a URL Shortner like TinyUrl

### Requirements

#### Functional Requirements
1. Given a long URL, the system should generate a short URL.
2. Given a short URL, the system should redirect to the original long URL.
3. The short URL should be unique.
4. The system should handle a large number of URLs efficiently.
5. The system should allow users to customize their short URLs (optional).

#### Non-Functional Requirements
1. The system should be highly available.
2. The system should be scalable to handle increasing traffic.
3. The system should have low latency for URL redirection.
4. The system should ensure data consistency.
5. The system should be secure against common web vulnerabilities.

### Capacity Estimation
1. Assume 1 million requests per day.
2. Average URL length: 100 characters.
3. Read to write ratio: 10:1.
4. Peak traffic: 10X the average traffic.

#### Throughput Estimation
- Write Requests: 1 million / 24 hours ≈ 12 requests/second
- Read Requests: 10 million / 24 hours ≈ 115 requests/second
- Peak Read Requests: 1150 requests/second
- Peak Write Requests: 120 requests/second

#### Storage Estimation
- Short URL length: 7 characters
- Original URL length: 100 characters
- Creation timestamp: 8 bytes
- Expiry timestamp: 8 bytes
- Created By User ID: 8 bytes
- Click Count: 4 bytes
- Total per URL entry: 7 + 100 + 8 + 8 + 8 + 4 = 135 bytes
- Total URL entries per year: 1 million * 365 = 365 million
- Total Storage per year: 365 million * 135 bytes ≈ 49.3 GB

#### Bandwidth Estimation
- Average URL redirection size: 500 bytes
- Daily Bandwidth for Reads: 10 million * 500 bytes = 5 TB/day
- Daily Bandwidth for Writes: 1 million * 500 bytes = 0.5 TB/day
- Total Daily Bandwidth: 5.5 TB/day

#### Caching Estimation
- Cache Hit Ratio: 80%
- Cache Size: 1 million entries
- Cache Storage: 1 million * 135 bytes = 135 MB
Following the 80-20 rule, we can cache 20% of the most frequently accessed URLs.
- Cached URLs: 20% of 1 million = 200,000 URLs
- Cache Storage: 200,000 * 135 bytes = 27 MB



### High-Level Design
1. **API Layer**: Exposes endpoints for creating short URLs and redirecting to long URLs.
2. **Application Layer**: Contains business logic for URL shortening, redirection, and validation.
3. **Database Layer**: Stores mappings between short URLs and long URLs, along with metadata.
4. **Cache Layer**: Caches frequently accessed URL mappings to reduce database load.
5. **Load Balancer**: Distributes incoming requests across multiple application servers.
6. **Monitoring and Logging**: Tracks system performance and logs errors for debugging. 

### Database Design
- **Tables**:
1. **URL_Mapping**:
   - short_url (Primary Key)
   - long_url
   - created_at
   - expiry_at
   - created_by_user_id
   - click_count
- **Indexes**:
   - Index on long_url for reverse lookups (if needed)
    - Index on created_by_user_id for user-specific queries
- **Partitioning**:
   - Partition by creation date to manage large datasets efficiently.
- **Replication**:
   - Use master-slave replication for read scalability.

#### API Design
1. **Create Short URL**
   - Endpoint: POST /api/shorten
   - Request Body: { "long_url": "string", "custom_alias": "string (optional)" }
   - Response: { "short_url": "string" }
2. **Redirect to Long URL**
   - Endpoint: GET /{short_url}
   - Response: HTTP 301 Redirect to long URL

#### Diving Deeper into Key Components
##### URL Shortening Algorithm
1. Generate a unique short URL using Base62 encoding of an auto-incremented ID or a hash function.
2. Check for collisions and regenerate if necessary.

