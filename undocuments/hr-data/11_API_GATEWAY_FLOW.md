# Distributed API Gateway Flow

> [!NOTE]
> In a decentralized setup, the Enterprise API Gateway must intelligently route traffic to the correct independent Department Node based on the employee's authentication token.

## 1. Decentralized Routing Logic

```mermaid
graph TD
    subgraph Clients
        E1[Eng Employee Desktop]
        E2[Sales Employee Desktop]
    end

    subgraph Perimeter
        WAF[Cloudflare / WAF]
    end

    subgraph Enterprise_Gateway [Kong / Nginx Ingress]
        JWT[JWT Inspector]
        ROUTER{Department Router}
    end

    subgraph Internal_Network [VPC]
        ENG_NODE[Engineering Node Cluster]
        SALES_NODE[Sales Node Cluster]
    end

    %% Flow
    E1 -->|POST /api/track| WAF
    E2 -->|POST /api/track| WAF
    
    WAF --> JWT
    
    JWT -->|Extract 'dept_id' from payload| ROUTER
    
    ROUTER -->|if dept_id == 'eng'| ENG_NODE
    ROUTER -->|if dept_id == 'sales'| SALES_NODE
```

## 2. Dynamic Routing Capabilities

The central API gateway does **not** process data; it acts as a highly efficient traffic cop.

- **Token Inspection**: When an employee logs in, the Auth Service injects their `dept_id` into their JWT.
- **Routing Rules**: The Gateway reads the JWT header (without needing to query a database) and forwards the HTTP request to the specific Kubernetes Service URL for that department (e.g., `http://eng-node.local/api/track`).
- **Load Balancing**: The Gateway load balances traffic *across* the nodes. If the Sales Node is overwhelmed during the end-of-quarter rush, it autoscales the Sales cluster independently without starving the Engineering cluster of resources.
- **Edge Throttling**: If a rogue employee agent starts spamming 1000 requests per second, the Gateway drops the traffic at the perimeter before it ever hits the Department Node.
