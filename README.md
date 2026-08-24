# الدبل — AL DOUBLE

**Professional Multiplayer Card Game**

A modern, real-time multiplayer card game built with:
- **Backend**: Node.js + Express + TypeScript
- **Frontend**: React 18 + Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Real-time**: Socket.IO + WebRTC
- **Deployment**: Docker + Docker Compose

## 🎮 Game Overview

AL DOUBLE is a strategic card game for 3-4 players featuring:
- **Risk & Negotiation**: Decide to double your stake and negotiate with other players
- **Card Evaluation**: Strategic hand ranking with unique rules
- **Virtual Economy**: Manage your balance through offers and economic outcomes
- **Social Gameplay**: Built-in chat and voice communication

## 📋 Rules Summary

- **Start**: 100 balance per player
- **Deck**: 24 cards (A, K, Q, J, 10, 9 × 4 suits)
- **Hand Size**: 4 cards per player
- **Ranking**: Four of a Kind > Three of a Kind > Pair > High Card
- **Core Rule**: REPETITION BEATS HIGHER SINGLE CARD (Pair 9 > High Card A)

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (if running locally without Docker)
- PostgreSQL 14+ (if running locally)

### Setup with Docker (Recommended)

```bash
# Clone repository
git clone https://github.com/Whiteman1111/AL_DOUBLE.git
cd AL_DOUBLE

# Create .env from example
cp .env.example .env

# Start all services
docker-compose up -d

# Initialize database
docker-compose exec backend npm run db:migrate
docker-compose exec backend npm run db:seed

# Access
# Frontend: http://localhost:5173
# Backend API: http://localhost:3000
```

### Setup Local Development

```bash
# Install dependencies
npm install

# Setup backend
cd backend
npm install
npx prisma generate
npx prisma migrate dev

# Setup frontend
cd frontend
npm install

# Setup shared types
cd ../shared
npm install

# Start development servers
cd ..
npm run dev
```

## 📁 Project Structure

```
AL_DOUBLE/
├── backend/                 # Node.js Server
│   ├── src/
│   │   ├── core/           # Game Engines
│   │   ├── application/    # Services & Handlers
│   │   ├── data/           # Database & Cache
│   │   ├── api/            # REST & WebSocket
│   │   ├── security/       # Auth & Validation
│   │   ├── config/         # Configuration
│   │   └── app.ts          # Entry point
│   ├── tests/              # Unit & Integration Tests
│   ├── prisma/             # Database Schema
│   └── package.json
│
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/     # React Components
│   │   ├── pages/          # Page Components
│   │   ├── store/          # State Management
│   │   ├── services/       # API & Socket
│   │   ├── hooks/          # Custom Hooks
│   │   └── App.tsx         # Root Component
│   ├── tests/              # Component Tests
│   └── package.json
│
├── shared/                 # Shared Types & Utils
│   ├── types/              # TypeScript Interfaces
│   ├── enums/              # Enum Definitions
│   ├── constants/          # Constants & Rules
│   └── package.json
│
├── docker-compose.yml      # Docker Services
├── .env.example            # Environment Template
└── README.md               # This file
```

## 🎯 Game Phases

1. **DEALING** → Shuffle and deal 4 cards to each player
2. **IN_OUT_SELECTION** → Players choose to play or sit out
3. **DOUBLE_SELECTION** → Select a "doubler" to increase stake
4. **NEGOTIATION** → Doubler offers deals to other players
5. **REVEAL_CONFIRMATION** → Players decide to reveal their hand
6. **REVEALING** → Cards are shown and evaluated
7. **CALCULATING_RESULT** → Winner is determined and economy applied
8. **ROUND_RESULT** → Display outcome and continue to next round

## 🔒 Security

- **Server Authority**: Server is the single source of truth
- **Balance Protection**: All balance calculations done server-side
- **Card Privacy**: Cards hidden until reveal
- **Input Validation**: All client inputs validated on server
- **Rate Limiting**: Protection against spam and DoS
- **Atomic Transactions**: ACID-compliant database operations

## 📊 Database Schema

Main tables:
- `User` — Player accounts
- `Room` — Game rooms
- `RoomPlayer` — Players in room
- `Game` — Game instances
- `Round` — Individual rounds
- `Offer` — Player offers
- `Transaction` — Economy tracking
- `ChatMessage` — In-game chat

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run backend tests
npm run test:backend

# Run frontend tests
npm run test:frontend

# Generate coverage
npm run test:coverage
```

## 🚢 Deployment

### Production Build

```bash
npm run build
docker-compose -f docker-compose.prod.yml up
```

### Environment Setup
1. Update `.env` with production values
2. Set `NODE_ENV=production`
3. Use strong JWT secrets
4. Enable HTTPS
5. Configure database backups

## 📝 Development Phases

- [x] PHASE 1: Architecture & Setup
- [x] PHASE 2: Card Engine
- [ ] PHASE 3: Economy Engine
- [ ] PHASE 4: Game State Machine
- [ ] PHASE 5: Room System
- [ ] PHASE 6: Backend API
- [ ] PHASE 7: Core Game Flow
- [ ] PHASE 8: WebSocket Events
- [ ] PHASE 9: Frontend Setup
- [ ] PHASE 10-22: UI & Features

## 🤝 Contributing

1. Create feature branch from `main`
2. Write tests for new code
3. Ensure all tests pass
4. Create pull request with description

## 📖 Documentation

- [Architecture](./ARCHITECTURE.md)
- [Game Rules](./GAME_RULES.md)
- [API Documentation](./backend/API.md)
- [Edge Cases](./EDGE_CASES.md)

## 📄 License

MIT

## 👨‍💻 Author

Built with ❤️ by Whiteman1111

---

**Start playing**: http://localhost:5173
