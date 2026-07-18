 # Monolithic vs Microservices Architecture

## 1. Monolithic Architecture

### What is it?
A **monolithic architecture** is a traditional software design where all components of an application (UI, business logic, database access, authentication, etc.) are bundled together into a **single, unified codebase** and deployed as **one unit**.

### Key Characteristics
- Single codebase for the entire application
- Single deployment unit (one JAR/WAR/EXE file)
- Shared database across all modules
- Tightly coupled components
- One tech stack for the whole app

### Advantages ✅
| Advantage | Explanation |
|-----------|-------------|
| **Simple to develop** | Easy to start, one project, one build pipeline |
| **Simple to test** | End-to-end testing is straightforward |
| **Simple to deploy** | Deploy one file/artifact |
| **Simple to scale** | Just run multiple copies behind a load balancer |
| **Less network overhead** | All calls are in-process, no network latency between services |

### Disadvantages ❌
| Disadvantage | Explanation |
|--------------|-------------|
| **Hard to maintain at scale** | As codebase grows, it becomes complex and hard to understand |
| **Slow development** | Large teams stepping on each other's code |
| **Scaling is inefficient** | You must scale the entire app, even if only one module needs more resources |
| **Technology lock-in** | Hard to adopt new tech; you're stuck with the original stack |
| **Deployment risk** | A small bug in one module can bring down the entire application |
| **Long CI/CD pipelines** | Even a tiny change requires building and testing the whole app |

### Real-World Example
- Early versions of **Netflix, Amazon, eBay** were monolithic
- Many startups begin with monoliths because of the simplicity

---

## 2. Separation of Concerns (SoC)

### What is it?
**Separation of Concerns** is a design principle where a system is divided into distinct sections, each addressing a **separate concern** (a specific functionality or responsibility). Each section has minimal overlap with others.

### How it applies to Monolithic vs Microservices

| Aspect | Monolithic | Microservices |
|--------|-----------|---------------|
| **SoC level** | Logical (packages/modules within same codebase) | Physical (separate deployable services) |
| **Concern separation** | At folder/package level | At service/process level |
| **Boundary enforcement** | Weak (developers can bypass package boundaries) | Strong (services must use API calls) |

### Real-world analogy
- **Monolith:** A single building with many rooms separated by doors (easy to move between, but fire spreads fast)
- **Microservices:** Separate buildings connected by roads (more effort to travel, but fire stays contained)

### Why SoC matters in interviews
> "Separation of concerns helps achieve **maintainability**, **scalability**, and **independent deployability**. Microservices enforce SoC at the infrastructure level, while monoliths rely on developer discipline."

---

## 3. Single Responsibility Principle (SRP)

### What is it?
**SRP** is the **S** in **SOLID** principles. It states:
> **"A class/module/service should have one, and only one, reason to change."**

### How SRP relates to Microservices
- Each microservice should own exactly **one business capability**
- A payment service should only handle payments, not also send emails
- If a service has multiple responsibilities, it should be broken down further

### SRP in Monolithic vs Microservices

| Aspect | Monolithic | Microservices |
|--------|-----------|---------------|
| **SRP enforcement** | By developer discipline (interfaces, packages) | Enforced at the architecture level (separate codebases, databases) |
| **Violation risk** | High — easy to add "just one more feature" to a class | Low — adding responsibilities requires creating a new service |
| **Refactoring** | Hard — extracting code later is difficult | Natural — each service already follows SRP |

### Example
```
❌ Bad (Monolith violating SRP):
OrderService handles: orders + inventory + payments + notifications

✅ Good (Microservices following SRP):
order-service     → only order management
inventory-service → only stock management
payment-service   → only payment processing
notification-service → only sending emails/SMS
```

### Interview Tip
> "Microservices are the **architectural expression of SRP**. Just as a class should have one reason to change, a service should own one business capability."

---

## 4. Microservices Architecture

### What is it?
**Microservices architecture** is an architectural style where an application is composed of **small, independent services** that communicate over a network (usually HTTP/REST or messaging queues). Each service is responsible for a **single business capability** and can be developed, deployed, and scaled independently.

### Key Characteristics
- Multiple small, focused services
- Each service has its own codebase and database
- Loosely coupled, highly cohesive
- Services communicate via APIs (REST, gRPC, message brokers)
- Each service can use its own tech stack
- Decentralized data management (each service owns its DB)

### Advantages ✅
| Advantage | Explanation |
|-----------|-------------|
| **Independent deployment** | Deploy one service without affecting others |
| **Scalability** | Scale only the services that need it (e.g., scale payment service during sales) |
| **Technology diversity** | Use the best tool for each job (Python for ML, Node.js for I/O, Go for performance) |
| **Fault isolation** | One service failing doesn't bring down the whole system |
| **Team autonomy** | Small teams own individual services end-to-end |
| **Faster development** | Smaller codebases are easier to understand and modify |

### Disadvantages ❌
| Disadvantage | Explanation |
|--------------|-------------|
| **Complexity** | Distributed systems are inherently complex |
| **Network latency** | Inter-service calls add network overhead |
| **Data consistency** | Maintaining consistency across services is hard (eventual consistency) |
| **Testing is harder** | Need integration tests across services |
| **Debugging is difficult** | A request may span multiple services; tracing issues is challenging |
| **Operational overhead** | Need containerization (Docker), orchestration (Kubernetes), service discovery, monitoring, etc. |
| **Duplication** | Common functionality (auth, logging) may be duplicated across services |

### Real-World Examples
- **Netflix** — migrated from monolith to microservices in 2009
- **Amazon** — each team owns a service (e.g., cart service, recommendation service)
- **Uber, Spotify, Twitter** — all use microservices at scale


---

## 5. Monolithic vs Microservices — Comparison Table

| Feature | Monolithic | Microservices |
|---------|-----------|---------------|
| **Codebase** | Single | Multiple (one per service) |
| **Deployment** | One unit | Independent per service |
| **Scaling** | Scale entire app | Scale individual services |
| **Database** | Shared | Database per service |
| **Communication** | In-process function calls | Network calls (REST/gRPC/messaging) |
| **Team structure** | Feature teams | Service ownership teams |
| **Fault tolerance** | Low (one bug = whole app down) | High (isolated failures) |
| **Development speed** | Fast initially, slows down | Slower initially, faster at scale |
| **Operational cost** | Low | High (infrastructure, monitoring) |
| **Best for** | Small apps, startups, MVPs | Large apps, growing teams, complex domains |


---

## 6. Interview Tips & Common Questions

### Q1: When should you choose Monolithic vs Microservices?
**Answer:**
- Start with **monolith** for MVPs, small teams, or simple applications.
- Move to **microservices** when the monolith becomes too large to manage, teams grow, or different parts of the app need to scale independently.
- **"Monolith first, microservices later"** is a common industry pattern.

### Q2: What is a "distributed monolith"?
**Answer:** A system that is deployed as microservices but is **tightly coupled** in practice (e.g., services share databases, synchronous calls everywhere). It has the **worst of both worlds** — complexity of microservices with the rigidity of a monolith.

### Q3: How do microservices communicate? (Detailed)
**Answer:**

Microservices communicate using two main patterns — **Synchronous** and **Asynchronous**.

#### A) Synchronous Communication
The client sends a request and **waits** for the response. The service must be available at the time of the call.

| Protocol | Description | Use Case |
|----------|-------------|----------|
| **REST (HTTP/HTTPS)** | Most common. Uses JSON/XML over HTTP. Stateless. | CRUD operations, public APIs |
| **gRPC** | High-performance, uses Protocol Buffers (binary). Supports streaming. | Internal service-to-service, low-latency systems |
| **GraphQL** | Client queries exactly what it needs. Single endpoint. | Complex data fetching, aggregating multiple services |

**Pros:** Simple, easy to debug, request-response model  
**Cons:** Tight coupling (caller waits), cascading failures, higher latency

```
Client → [API Gateway] → Payment Service (waits for response)
                         → Inventory Service (waits for response)
```

#### B) Asynchronous Communication
The client sends a message and **does not wait** for an immediate response. The message is processed later.

| Method | Description | Use Case |
|--------|-------------|----------|
| **Message Queues** | Producer sends message to queue, consumer picks it up later (RabbitMQ, Amazon SQS) | Order processing, task distribution |
| **Event Streaming** | Events published to a stream, multiple consumers can read (Kafka, AWS Kinesis) | Real-time analytics, audit logs, event sourcing |
| **Pub/Sub** | Publisher sends event, subscribers receive it (Redis Pub/Sub, Google Pub/Sub) | Notifications, broadcasting |

**Pros:** Loose coupling, fault tolerance, better scalability  
**Cons:** Harder to debug, eventual consistency, message ordering challenges

```
Client → [Order Service] → publishes "OrderCreated" event to Kafka
                           ↓
              Payment Service (consumes event asynchronously)
              Inventory Service (consumes event asynchronously)
              Notification Service (consumes event asynchronously)
```

#### C) Communication Patterns Comparison

| Aspect | Synchronous | Asynchronous |
|--------|-------------|--------------|
| **Coupling** | Tight (caller depends on callee) | Loose (producer doesn't know consumers) |
| **Latency** | Higher (waiting for response) | Lower from caller's perspective |
| **Fault tolerance** | Low (if service down, request fails) | High (messages queued for later) |
| **Complexity** | Low | High (need message broker, retry logic) |
| **Data consistency** | Strong consistency possible | Eventual consistency |
| **Best for** | Queries, real-time operations | Commands, background processing, events |

#### D) Common Communication Architecture

```
                    ┌──────────────────┐
                    │   API Gateway    │
                    │ (Single Entry)   │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
      ┌────────────┐ ┌────────────┐ ┌────────────┐
      │  Order     │ │  Payment   │ │ Inventory  │
      │  Service   │ │  Service   │ │  Service   │
      └─────┬──────┘ └─────┬──────┘ └─────┬──────┘
            │              │              │
            └──────────────┼──────────────┘
                           ▼
                  ┌────────────────┐
                  │   Message      │
                  │   Broker       │
                  │  (Kafka/Rabbit)│
                  └────────────────┘
```

#### Interview Tip
> "The choice between sync and async communication depends on your use case. Use **REST/gRPC** for queries where you need an immediate answer. Use **message brokers** for commands where you can tolerate some delay and want loose coupling."

### Q4: How do you handle data consistency in microservices?
**Answer:**
- Use **eventual consistency** with **Saga pattern** (choreography or orchestration)
- Avoid distributed transactions (2PC) — they don't scale well
- Each service owns its database

### Q5: What are the key technologies for microservices?
**Answer:**
- **Containerization:** Docker
- **Orchestration:** Kubernetes, Docker Swarm
- **API Gateway:** Kong, Nginx, AWS API Gateway
- **Service Discovery:** Consul, Eureka, Kubernetes DNS
- **Monitoring:** Prometheus, Grafana, ELK Stack
- **Tracing:** Jaeger, Zipkin
- **Message Broker:** Kafka, RabbitMQ

### Q6: What is an API Gateway?
**Answer:** A single entry point for all clients. It handles routing, authentication, rate limiting, and aggregation. It shields clients from knowing about individual microservices.

### Q7: What are the 2 ways in which an API call fetches data? (Polling vs Webhooks/Streaming)
**Answer:**

There are **two fundamental ways** a client can fetch data from an API:

#### 1. Polling (Client pulls data)
The client **repeatedly requests** data from the server at regular intervals.

```
Client: "Any new data?"  →  Server: "No"
Client: "Any new data?"  →  Server: "No"  
Client: "Any new data?"  →  Server: "Yes, here it is"
```

| Type | Description | Example |
|------|-------------|---------|
| **Short Polling** | Client sends requests every few seconds | Checking order status every 5s |
| **Long Polling** | Server holds the request open until new data is available, then responds | Chat apps, notifications |

**Pros:** Simple to implement, works with any HTTP client  
**Cons:** Wastes bandwidth, higher latency, unnecessary server load

#### 2. Webhooks / Server-Sent Events / WebSockets (Server pushes data)
The server **sends data to the client automatically** when new data is available, without the client asking.

```
Client registers a callback URL → Server stores it
Server: "New data available!"  → pushes to Client's callback URL
```

| Method | Description | Use Case |
|--------|-------------|----------|
| **Webhooks** | Server sends HTTP POST to a pre-registered URL when an event occurs | Payment success notification, CI/CD build complete |
| **Server-Sent Events (SSE)** | Server pushes events over a single long-lived HTTP connection | Live stock prices, news feeds |
| **WebSockets** | Full-duplex bidirectional communication channel | Real-time chat, live collaboration, gaming |

**Pros:** Real-time, efficient (no wasted requests), lower latency  
**Cons:** More complex to implement, requires persistent connections

#### Comparison Table

| Aspect | Polling (Pull) | Webhooks/Streaming (Push) |
|--------|---------------|--------------------------|
| **Who initiates?** | Client | Server |
| **Real-time?** | No (bounded by poll interval) | Yes (instant) |
| **Server load** | High (many empty responses) | Low (only sends when data changes) |
| **Complexity** | Low | Medium-High |
| **Bandwidth usage** | High (constant requests) | Low (only actual data) |
| **Best for** | Simple apps, low-frequency updates | Real-time apps, high-frequency updates |

#### Real-world examples
- **Polling:** Gmail checking for new emails every 30 seconds
- **Webhook:** GitHub sends a POST to your CI server when code is pushed
- **WebSocket:** Trading apps showing live stock prices
- **SSE:** Twitter feed updating in real-time

#### Interview Tip
> "Use **polling** for simple cases where near-real-time is acceptable. Use **webhooks/streaming** when you need instant updates and want to minimize server load. Many modern systems use a combination — poll for non-critical data, webhooks for critical events."

### Q8: What is CORS? (Cross-Origin Resource Sharing)
**Answer:**

#### What is it?
**CORS** is a browser security mechanism that controls which **origins** (domain, protocol, port) are allowed to access resources from a different origin.

#### Why does CORS exist?
Browsers enforce the **Same-Origin Policy (SOP)** — a script from `https://myapp.com` cannot read data from `https://api.other.com` unless explicitly allowed. CORS is the way to **relax** this policy in a controlled manner.

#### How it works (simplified)
```
Browser (myapp.com)  →  sends request to api.other.com
                        ↓
Server (api.other.com)  →  checks if myapp.com is allowed
                        ↓
Response includes header:  Access-Control-Allow-Origin: https://myapp.com
                        ↓
Browser checks header  →  if allowed, gives data to JS
                        →  if NOT allowed, blocks the response (CORS error)
```

#### Common CORS Headers

| Header | Purpose | Example |
|--------|---------|---------|
| `Access-Control-Allow-Origin` | Which origins are allowed | `*` (any) or `https://myapp.com` |
| `Access-Control-Allow-Methods` | Which HTTP methods are allowed | `GET, POST, PUT, DELETE` |
| `Access-Control-Allow-Headers` | Which custom headers are allowed | `Content-Type, Authorization` |
| `Access-Control-Allow-Credentials` | Whether cookies/auth headers are allowed | `true` |
| `Access-Control-Max-Age` | How long to cache the preflight result | `86400` (24 hours) |

#### Simple vs Preflight Requests

| Type | Condition | Behavior |
|------|-----------|----------|
| **Simple Request** | GET/POST/HEAD with standard headers only | Browser sends request directly, checks `Allow-Origin` in response |
| **Preflight Request** | PUT/DELETE/PATCH or custom headers | Browser first sends `OPTIONS` request to check permissions, then sends actual request |

```
Preflight flow:
Browser → OPTIONS /api/data (preflight) → Server responds with CORS headers
Browser → GET /api/data (actual request) → Server returns data
```

#### How to fix CORS errors

**On the server (backend):**
```javascript
// Node.js / Express example
app.use(cors({
  origin: 'https://myapp.com',
  methods: ['GET', 'POST'],
  credentials: true
}));
```

**On the client (frontend):**
- You **cannot** fix CORS from the frontend code alone
- Options:
  1. Use a **proxy** (e.g., in development: `"proxy": "http://localhost:5000"` in package.json)
  2. Use a **CORS proxy service** (e.g., `https://cors-anywhere.herokuapp.com/`) — only for development
  3. Ask the backend team to add proper CORS headers

#### CORS in Microservices
In a microservices architecture, CORS is typically handled at the **API Gateway** level:

```
Client → API Gateway (handles CORS) → Service A
                                    → Service B
                                    → Service C
```

This way, individual services don't need to worry about CORS — the gateway adds the headers.

#### Common Interview Questions

**Q: What is the difference between CORS and SOP?**
- **SOP (Same-Origin Policy):** Browser rule that blocks cross-origin reads by default
- **CORS:** A mechanism to selectively bypass SOP using HTTP headers

**Q: Can you fix CORS from the frontend?**
- No. CORS is enforced by the browser, and the server must send the correct headers. The frontend can only use a proxy (dev only) or request the backend team to add CORS support.

**Q: Why does CORS exist only in browsers?**
- CORS is a **browser-only** security feature. Server-to-server calls (e.g., backend to backend) are not restricted by CORS — they can communicate freely.

#### Interview Tip
> "CORS is a **browser security mechanism**, not a server security mechanism. It protects users from malicious websites making unauthorized API calls on their behalf. Always handle CORS at the **API Gateway** level in microservices, and never use `Access-Control-Allow-Origin: *` in production if you're sending cookies or auth tokens."

### Q9: What is Optional Chaining? (`?.`)
**Answer:**

#### What is it?
**Optional Chaining** (`?.`) is a JavaScript operator that allows you to safely access **nested object properties** without having to check if each intermediate property exists. If any property in the chain is `null` or `undefined`, the expression **short-circuits** and returns `undefined` instead of throwing an error.

#### Why is it needed?
Without optional chaining, accessing deeply nested properties requires verbose null checks:

```javascript
// ❌ Without optional chaining — throws error if any level is null/undefined
const city = user.address.city;  // TypeError: Cannot read properties of undefined

// ❌ Verbose workaround — lots of repetitive checks
const city = user && user.address && user.address.city;

// ✅ With optional chaining — clean and safe
const city = user?.address?.city;  // Returns undefined if anything is missing
```

#### Syntax & Usage

| Expression | What it does | Returns if null/undefined |
|------------|-------------|---------------------------|
| `obj?.prop` | Access property `prop` on `obj` | `undefined` |
| `obj?.[expr]` | Access dynamic property | `undefined` |
| `obj?.method()` | Call method `method` on `obj` | `undefined` (doesn't throw) |
| `arr?.[index]` | Access array element at `index` | `undefined` |

#### Real-world examples

**1. API response handling (most common use case)**
```javascript
// API might return incomplete data
const restaurant = {
  name: "Pizza Hut",
  rating: 4.5,
  // address might be missing
};

// ❌ Without optional chaining
const city = restaurant.address ? restaurant.address.city : "Unknown";

// ✅ With optional chaining
const city = restaurant?.address?.city ?? "Unknown";
// ?? is nullish coalescing — if left side is null/undefined, use default
```

**2. Array of objects from API**
```javascript
// Data from an API — some fields may be missing
const restaurants = [
  { name: "Dominos", info: { rating: 4.2, costForTwo: 300 } },
  { name: "McDonalds" }  // info is missing!
];

// Safe access without crashing
restaurants.forEach(r => {
  console.log(r?.info?.rating ?? "No rating");
  // Output: 4.2, "No rating"
});
```

**3. Function calls that may not exist**
```javascript
// Optional callback
function fetchData(onSuccess) {
  const data = { id: 1 };
  onSuccess?.(data);  // Only calls if onSuccess is a function
}
```

**4. Dynamic property access**
```javascript
const key = "city";
const location = user?.address?.[key];  // Safe dynamic access
```

#### Optional Chaining vs Traditional Checks

| Aspect | Traditional (`&&`) | Optional Chaining (`?.`) |
|--------|-------------------|--------------------------|
| **Readability** | Poor — lots of repetition | Clean and concise |
| **Maintainability** | Hard — adding a level means adding another check | Easy — just add another `?.` |
| **Performance** | Same | Same (short-circuits) |
| **Browser support** | All browsers | Modern browsers (ES2020) |

#### Common Interview Questions

**Q: What's the difference between `?.` and `??`?**
- `?.` (Optional Chaining): Safely access nested properties
- `??` (Nullish Coalescing): Provide a default value when left side is `null` or `undefined`
- They are often used together: `user?.address?.city ?? "Unknown"`

**Q: Does optional chaining work with arrays?**
- Yes: `arr?.[0]` safely accesses the first element, returns `undefined` if `arr` is null/undefined

**Q: Can optional chaining be used on the left side of an assignment?**
- No: `obj?.prop = value` throws a SyntaxError. You cannot use optional chaining for assignment.

**Q: What's the difference between `obj?.prop` and `obj.prop`?**
- `obj.prop` throws `TypeError` if `obj` is `null` or `undefined`
- `obj?.prop` returns `undefined` if `obj` is `null` or `undefined`

#### Interview Tip
> "Optional chaining is **essential** when working with API data in React. API responses often have missing or incomplete fields. Using `?.` prevents your app from crashing and eliminates the need for verbose null checks. Always pair it with `??` (nullish coalescing) to provide sensible defaults."

### Q10: What is Shimmer UI? (Loading Skeleton / Placeholder UI)
**Answer:**

#### What is it?
**Shimmer UI** (also called **Skeleton Screen** or **Placeholder UI**) is a visual placeholder that is shown while the actual content is loading. It mimics the **layout structure** of the final content using animated gray/shimmering boxes, giving users the perception that content is loading and improving the perceived performance.

#### Why use Shimmer UI?

| Problem | Solution |
|---------|----------|
| **Blank white screen** while loading | Users see a structured placeholder instead of nothing |
| **Spinner/loader** doesn't show what's coming | Shimmer shows the actual layout (image shape, text lines, buttons) |
| **Perceived slowness** | Users feel the app is faster because they see something happening |
| **Bad UX on slow networks** | Prevents layout shift when content finally loads |

#### Visual Example

```
Actual Content (loaded):          Shimmer UI (loading):
┌──────────┐  ┌──────────┐       ┌──────────┐  ┌──────────┐
│  Image   │  │ Title     │       │ ░░░░░░░░ │  │ ░░░░░░░░ │
│          │  │ Rating    │       │ ░░░░░░░░ │  │ ░░░░░░░░ │
│          │  │ Cost      │       │ ░░░░░░░░ │  │ ░░░░░░░░ │
└──────────┘  └──────────┘       └──────────┘  └──────────┘
                                  (animated shimmer effect)
```

#### How to implement Shimmer UI in React

**1. Create a Shimmer component:**
```jsx
const Shimmer = () => {
  return (
    <div className="shimmer-card">
      <div className="shimmer-img" />
      <div className="shimmer-line shimmer-line--short" />
      <div className="shimmer-line shimmer-line--medium" />
      <div className="shimmer-line shimmer-line--long" />
    </div>
  );
};
```

**2. CSS for the shimmer animation:**
```css
.shimmer-card {
  background: #f0f0f0;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
}

.shimmer-img {
  width: 100%;
  height: 200px;
  background: linear-gradient(
    90deg,
    #e0e0e0 25%,
    #f8f8f8 50%,
    #e0e0e0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.shimmer-line {
  height: 16px;
  margin-top: 12px;
  background: linear-gradient(
    90deg,
    #e0e0e0 25%,
    #f8f8f8 50%,
    #e0e0e0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.shimmer-line--short { width: 40%; }
.shimmer-line--medium { width: 70%; }
.shimmer-line--long { width: 90%; }

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**3. Use it conditionally while data loads:**
```jsx
const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  // Show shimmer while loading
  if (loading) {
    return (
      <div className="restaurant-list">
        {Array(8).fill("").map((_, i) => <Shimmer key={i} />)}
      </div>
    );
  }

  // Show actual content when loaded
  return (
    <div className="restaurant-list">
      {restaurants.map(r => <RestaurantCard key={r.id} data={r} />)}
    </div>
  );
};
```

#### Shimmer UI vs Traditional Loading

| Aspect | Spinner/Loader | Shimmer UI |
|--------|---------------|------------|
| **What user sees** | A spinning icon | Placeholder matching content layout |
| **Perceived speed** | Feels slower | Feels faster |
| **Layout shift** | Content jumps when loaded | No shift — placeholders match final layout |
| **UX quality** | Poor — tells user nothing | Good — shows what's coming |
| **Implementation** | Simple | Slightly more complex |

#### Real-world examples
- **Facebook** — shimmer cards while feed loads
- **YouTube** — gray video thumbnails with animated lines
- **LinkedIn** — skeleton profile cards
- **Swiggy/Zomato** — shimmer restaurant cards while fetching data

#### Common Interview Questions

**Q: Why not just use a spinner?**
- Spinners don't communicate what the final layout will look like. Shimmer UI reduces **cognitive load** by showing the structure upfront, making the app feel faster and more polished.

**Q: How many shimmer cards should you show?**
- Show the same number as the expected content (e.g., if you display 8 restaurant cards, show 8 shimmer cards). This prevents layout shift when real data loads.

**Q: What is Cumulative Layout Shift (CLS)?**
- CLS is a Core Web Vital metric that measures visual stability. Shimmer UI helps reduce CLS by reserving space for content before it loads.

#### Interview Tip
> "Shimmer UI is a **UX pattern**, not just a loading animation. It improves **perceived performance** and reduces **Cumulative Layout Shift (CLS)** . In React, implement it by conditionally rendering shimmer components while data is being fetched, then swapping them with actual content once the API responds."


### Q11: What is Conditional Rendering in React?
**Answer:**

#### What is it?
**Conditional Rendering** is a technique in React where you render different UI components or elements **based on a condition** (e.g., whether data is loading, whether a user is logged in, whether an error occurred). It works just like JavaScript conditions — using `if`, `&&`, ternary (`? :`), or switch statements.

#### Why is it needed?
In real-world apps, you don't always show the same UI. For example:
- Show a **loading shimmer** while fetching data, then show the **actual content**
- Show a **login button** if user is not authenticated, else show **user profile**
- Show an **error message** if API fails, else show **data list**
- Show **different layouts** based on screen size or user role

#### 5 Ways to Conditionally Render in React

| Method | Syntax | Best for |
|--------|--------|----------|
| **1. `if/else`** | `if (cond) return <A />; return <B />;` | Top-level conditions, early returns |
| **2. Ternary (`? :`)** | `{cond ? <A /> : <B />}` | Inline if/else inside JSX |
| **3. Logical `&&`** | `{cond && <Component />}` | Render or render nothing |
| **4. `||` (OR)** | `{data || <Fallback />}` | Fallback when value is falsy |
| **5. Switch / Object Map** | `{ {key1: <A />, key2: <B />}[key] }` | Multiple conditions (enums) |

#### Examples

**1. `if/else` (Early Return) — Best for loading states**
```jsx
const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Shimmer />;  // Show shimmer while loading
  }

  return (
    <div className="restaurant-list">
      {restaurants.map(r => <RestaurantCard key={r.id} data={r} />)}
    </div>
  );
};
```

**2. Ternary (`? :`) — Best for inline toggling**
```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <UserProfile />   // If logged in
      ) : (
        <LoginButton />   // If not logged in
      )}
    </div>
  );
}
```

**3. Logical `&&` — Best for "show if true, nothing if false"**
```jsx
function Notification({ message }) {
  return (
    <div>
      {message && <div className="alert">{message}</div>}
      {/* Only renders if message is truthy */}
    </div>
  );
}
```

**4. `||` (OR operator) — Best for fallback values**
```jsx
function PriceDisplay({ price }) {
  return <span>{price || "Free"}</span>;
  // Shows "Free" if price is 0, null, or undefined
}
```

**5. Object Map (Switch alternative) — Best for multiple conditions**
```jsx
function StatusBadge({ status }) {
  const statusMap = {
    pending: <span className="yellow">⏳ Pending</span>,
    success: <span className="green">✅ Success</span>,
    failed:  <span className="red">❌ Failed</span>,
  };

  return statusMap[status] || <span>Unknown</span>;
}
```

#### Conditional Rendering Patterns in Microservices Context

| Scenario | Condition | Rendered UI |
|----------|-----------|-------------|
| **Loading** | `loading === true` | `<Shimmer />` |
| **Error** | `error !== null` | `<ErrorComponent message={error} />` |
| **Empty data** | `data.length === 0` | `<EmptyState />` |
| **Success** | `data.length > 0` | `<DataList items={data} />` |

#### Full Example: API Fetch with All States
```jsx
const RestaurantList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/restaurants")
      .then(res => res.json())
      .then(data => { setData(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  // Conditional rendering for each state
  if (loading) return <Shimmer />;
  if (error)   return <ErrorComponent message={error} />;
  if (!data?.length) return <EmptyState />;

  return (
    <div>
      {data.map(item => <RestaurantCard key={item.id} {...item} />)}
    </div>
  );
};
```

#### Common Interview Questions

**Q: Why use `&&` instead of ternary for show/hide patterns?**
- `{cond && <Component />}` is cleaner than `{cond ? <Component /> : null}`. Both work, but `&&` is more concise when there's no "else" branch.

**Q: Can you use `if/else` inside JSX?**
- No. JSX is syntactic sugar for `React.createElement()` calls. `if/else` are statements, not expressions. Use ternary (`? :`) or `&&` inside JSX.

**Q: What is the difference between `cond && <A />` and `cond ? <A /> : null`?**
- Both produce the same output. However, `cond && <A />` returns `false` (not rendered) when `cond` is `false`. `cond ? <A /> : null` returns `null`. In practice, neither affects the DOM.

**Q: What happens if you render `false`, `null`, or `undefined` in JSX?**
- React ignores them and renders nothing. This is why `{loading && <Spinner />}` works — if `loading` is `false`, nothing is rendered.

#### Interview Tip
> "Conditional rendering is fundamental in React. The **pattern** that impresses interviewers is handling **all 4 states** — loading, error, empty, and success. Always use **early returns** for loading/error states (cleanest), ternary for inline toggles, and `&&` for simple show/hide. Never use `if/else` inside JSX — use ternary instead."

---

## 7. Key Takeaway for Interviews

> **"Monolithic architecture is simple but doesn't scale well. Microservices scale well but introduce complexity. The right choice depends on your team size, application complexity, and business needs. Start with a monolith, and extract microservices when needed."**

### Buzzwords to Use in Interviews
- **Tight coupling vs Loose coupling**
- **Single responsibility principle** (each service does one thing)
- **Bounded context** (from Domain-Driven Design)
- **Independent deployability**
- **Fault isolation / Bulkhead pattern**
- **Polyglot persistence** (different DBs for different services)
- **Eventual consistency**
- **Saga pattern**
- **CQRS** (Command Query Responsibility Segregation)