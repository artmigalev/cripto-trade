# CryptoTrade 🚀

A full-stack cryptocurrency trading platform clone built on top of the **Binance Spot Testnet**.
The platform allows users to browse real-time market data, analyze charts, manage a watchlist, and execute test trades with virtual funds — no real money involved.

> **Live Demo:** [cryptotrade.vercel.app](https://cripto-trade-git-develop-artmigalevs-projects.vercel.app/dashboard)
> **Author:** [Artyom Migalev](https://github.com/artmigalev)

---

## 📸 Screenshots
![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Angular | 21.2.0 | Framework (Standalone, Signals, OnPush) |
| TypeScript | 5.9 | Language |
| RxJS | 7.8 | Reactive programming |
| Angular Material | 21 | UI components |
| Tailwind CSS | 4 | Utility-first styling |
| lightweight-charts | latest | Candlestick chart (TradingView) |
| Vitest | 4 | Unit testing |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| NestJS | 11 | Backend framework |
| JWT | — | Authentication |
| HMAC-SHA256 | Web Crypto API | Binance request signing |
| Axios | — | HTTP requests to Binance |

### Infrastructure
| Tool | Purpose |
|---|---|
| pnpm | Package manager |
| GitHub Actions | CI/CD (lint on push/PR) |
| Vercel | Frontend deployment |

---

## 🏗 Architecture

```
crypto-trade-app/
├── frontend/          # Angular 21 SPA
│   └── src/
│       ├── app/
│       │   ├── core/
│       │   │   ├── services/      # AuthService, MarketService, TradeService...
│       │   │   ├── interceptors/  # auth + error HTTP interceptors
│       │   │   ├── handlers/      # GlobalErrorHandler, AppError classes
│       │   │   └── tokens/        # InjectionTokens (API_CONFIG)
│       │   ├── features/          # Lazy-loaded pages
│       │   │   ├── dashboard/
│       │   │   ├── markets/
│       │   │   ├── trade/
│       │   │   ├── portfolio/
│       │   │   ├── about-as/
│       │   │   ├── login-page/
│       │   │   ├── register-page/
│       │   │   ├── settings/
│       │   │   └── not-found/
│       │   ├── components/        # Shared UI components
│       │   └── shared/
│       │       ├── guards/        # authGuard
│       │       ├── pipes/         # ConverterPipe
│       │       ├── directives/    # HighlightDirective
│       │       ├── interceptors/  # authInterceptor, errorInterceptor
│       │       └── mappers/       # Data transformation functions
│       └── enums/                 # Application-wide enums
│
└── backend/           # NestJS API
    └── src/
        ├── auth/      # JWT auth (register, login, /me)
        ├── keys/      # Binance API key storage
        ├── trade/     # Order placement (HMAC signed)
        ├── portfolio/ # Account info + order history (HMAC signed)
        └── hmac/      # HMAC-SHA256 signing service
```

---

## 🔐 Security Architecture

Private Binance API keys **never leave the server**:

```
Angular (Frontend)
  ↓  POST /trade/create-order { symbol, side, quantity }
NestJS (Backend)
  ↓  retrieves secretKey from memory
  ↓  signs request with HMAC-SHA256 (Web Crypto API)
  ↓  POST https://testnet.binance.vision/api/v3/order
Binance Testnet
  ↓  verifies signature → executes order
NestJS → Angular (result)
```

---

## ⚡ Key Features

### Dashboard
- Top trading pairs by volume (real-time prices via WebSocket `!miniTicker@arr`)
- Watchlist with favorite pairs (persisted in localStorage)
- Portfolio summary

### Markets
- Full pairs table with real-time updates
- Filter by quote currency (USDT / BTC / ETH / ALL)
- Sort by Price, 24h Change, Volume
- Live search with `debounceTime` + `distinctUntilChanged`

### Trade _(in progress)_
- Candlestick chart powered by `lightweight-charts` (TradingView)
- Real-time WebSocket streams: `@kline`, `@depth`, `@ticker`
- Order Book with bid/ask columns
- Order Form (Buy/Sell, Market/Limit) with HMAC-signed submission

### Portfolio _(in progress)_
- Asset table with balances from Binance (`GET /api/v3/account`, HMAC)
- Portfolio value in USD (real-time recalculation)
- Distribution pie chart
- Order history (`GET /api/v3/allOrders`, HMAC)

### Auth
- Register / Login with JWT
- Protected routes via `authGuard`
- Automatic token injection via HTTP Interceptor
- Binance API Key setup in Settings

---

## 🧪 Testing

17+ unit tests covering:
- **Services:** AuthService, MarketService, KeysService (TestBed + HttpClientTesting)
- **Pipes:** ConverterPipe
- **Directives:** HighlightDirective

```bash
cd frontend
pnpm test
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/artmigalev/cripto-trade.git
cd cripto-trade
```

### Frontend

```bash
cd frontend
pnpm install
pnpm start
# → http://localhost:4200
```

### Backend

```bash
cd backend
npm install
npm run start:dev
# → http://localhost:3000
```

### Environment

Create `backend/.env`:
```env
JWT_SECRET=your_jwt_secret_here
```

### Binance Testnet Setup

1. Go to [testnet.binance.vision](https://testnet.binance.vision/) and sign in via GitHub
2. Generate an API Key (you'll get `apiKey` + `secretKey`)
3. Virtual funds are credited automatically
4. Enter your keys in the app Settings page

---

## 🔄 CI/CD

GitHub Actions runs on every push/PR to `main` and `develop`:

```yaml
push → pnpm install → pnpm lint
```

Frontend is automatically deployed to Vercel on merge to `main`.

---

## 📋 Sprint Progress

| Sprint | Topic | Status |
|---|---|---|
| Sprint 1 | Project setup, components, routing | ✅ Done |
| Sprint 2 | Signals, guards, lazy loading, CI/CD, Vercel deploy | ✅ Done |
| Sprint 3 | Reactive forms, pipes, directives, InjectionToken, NestJS backend | ✅ Done |
| Sprint 4 | HTTP interceptors, RxJS operators, WebSocket, 17+ tests, 404 page | ✅ Done |
| Sprint 5 | Trade page, Portfolio page, HMAC signing | 🔄 In progress |

---

## 📄 License

MIT

---

<div align="center">
  
  <br/>
  Built as part  2026
</div>
