# FreshCells Task - Authentication App

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Environment Setup

#### Option A: Mock Mode (Recommended for Testing)

For local testing without a backend, simply don't set any environment variables. The app will automatically use mock data. <br/>
**Credentials**:<br/>
_Username_: **john.doe@example.com**<br/>
_Password_: **Password123.**

#### Option B: Real GraphQL Endpoint

Create a `.env.local` file in the root directory and add your GraphQL endpoint:

```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=your_graphql_endpoint_here
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker Support

**Creating and starting the container:**

```bash
docker-compose up --build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
