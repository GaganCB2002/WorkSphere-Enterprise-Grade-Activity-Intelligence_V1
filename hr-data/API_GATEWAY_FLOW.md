# API Gateway Architecture

> [!NOTE]
> The API Gateway acts as the single entry point for all client requests (Frontend UI, Mobile Apps, Desktop Agents). It abstracts the underlying microservice topology from the client.

## 1. Gateway Routing Architecture

```mermaid
graph TD
    subgraph Clients
        WEB[Web Dashboard]
        MOB[Mobile App]
        AGENT[Desktop Tracker]
    end

    subgraph API_Gateway [Enterprise Gateway - Kong/Nginx]
        SSL[SSL Termination]
        WAF[WAF / Firewall]
        RATE[Rate Limiting (Redis)]
        JWT[JWT Validator]
        ROUTER[URL Path Router]
    end

    subgraph Microservices [Internal Cluster]
        AUTH[Auth Service :8081]
        HR[HR Core Service :8082]
        TRACK[Tracking Service :8083]
        AI[AI Engine :8084]
    end

    WEB --> SSL
    MOB --> SSL
    AGENT --> SSL

    SSL --> WAF
    WAF --> RATE
    RATE --> JWT
    JWT --> ROUTER

    ROUTER -->|/api/v1/auth/*| AUTH
    ROUTER -->|/api/v1/hr/*| HR
    ROUTER -->|/api/v1/track/*| TRACK
    ROUTER -->|/api/v1/ai/*| AI
```

## 2. Gateway Capabilities

1. **SSL Termination**: Offloads HTTPS decryption at the perimeter, reducing CPU load on internal microservices. Internal communication operates on unencrypted HTTP or gRPC within the secure VPC.
2. **Rate Limiting**: Protects against brute-force attacks and noisy neighbors. Different rate limits apply based on the route (e.g., `/auth/login` is strictly limited, while `/track/sync` is allowed higher throughput). State is maintained via a Redis cluster.
3. **Authentication Offloading**: Validates the JWT signature at the edge. If the token is invalid, the request drops immediately without hitting internal services.
4. **Header Injection**: After JWT validation, the gateway injects downstream headers (e.g., `X-User-ID`, `X-Org-ID`, `X-Roles`) so internal microservices don't have to parse the JWT themselves.
5. **Path Routing**: Maps public URLs to internal Kubernetes Service DNS names.
6. **CORS Handling**: Manages Cross-Origin Resource Sharing headers for browser-based clients.
