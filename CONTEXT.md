# Kalakariaan Project Context

**Last Updated:** 2026-03-26

## Project Overview

**Kalakariaan** is a D2C Influencer Marketplace connecting brands with micro-influencers for authentic marketing campaigns.

## User Flow

```
Landing Page (Product Info)
    ↓
Login/Register (Google OAuth)
    ↓
Role Selection (Brand / Influencer)
    ↓
┌────────────────────┬────────────────────┐
│      BRAND         │    INFLUENCER      │
├────────────────────┼────────────────────┤
│ • Browse Influencers│ • View Campaigns   │
│ • Create Campaign  │ • Submit Proposal  │
│ • Manage Campaigns │ • Dashboard       │
└────────────────────┴────────────────────┘
```

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB + Mongoose (Railway)
- **Auth:** Google OAuth 2.0 + JWT
- **Deployment:** Vercel (frontend) + Railway (backend)

## Project Structure (Monorepo)

```
/kalakaarian
├── client/              # Frontend (Vite + React)
│   └── src/
│       ├── pages/       # All page components
│       ├── components/  # Reusable components
│       ├── hooks/       # Custom hooks
│       └── lib/         # Utilities & API client
├── server/              # Backend (Express)
│   └── src/
│       ├── controllers/ # Route handlers
│       ├── models/      # Mongoose models
│       ├── routes/      # API routes
│       └── middleware/ # Auth, validation
├── packages/
│   └── models/          # Shared TypeScript types
└── docs/               # Documentation
```

## Current Status

| Component | Status |
|-----------|--------|
| Frontend | 🟡 Landing page + Auth UI, needs Google OAuth |
| Backend | 🟡 Basic auth, needs Google OAuth |
| Database | ✅ Models ready |
| Testing | 🔴 Needs setup |
| Docs | 🟡 Needs update |

---

## Agent Responsibilities

### 🤖 Agent 1: FRONTEND

**Location:** `/client`

**Responsibilities:**
1. Landing Page redesign with product info
2. Google OAuth login integration (Google Sign-In)
3. Role selection flow after login
4. Brand dashboard (browse influencers, create campaign)
5. Influencer dashboard (view campaigns, submit proposals)
6. Marketplace for brands to browse influencers

**Files to modify:**
- `client/src/pages/Landing.tsx`
- `client/src/pages/LoginPage.tsx`
- `client/src/pages/RoleSelectPage.tsx`
- `client/src/pages/BrandDashboard.tsx`
- `client/src/pages/InfluencerDashboard.tsx`
- `client/src/hooks/useAuth.tsx`

---

### 🤖 Agent 2: BACKEND

**Location:** `/server`

**Responsibilities:**
1. Google OAuth 2.0 implementation
2. JWT token generation for Google users
3. Role-based API endpoints
4. Campaign CRUD for brands
5. Proposal endpoints for influencers
6. Influencer search/filter APIs

**Files to modify:**
- `server/src/routes/auth.ts`
- `server/src/controllers/authController.ts`
- `server/src/controllers/campaignController.ts`
- `server/src/controllers/proposalController.ts`
- `server/src/controllers/influencerController.ts`

---

### 🤖 Agent 3: DATABASE

**Location:** `/server/src/models`

**Responsibilities:**
1. User model with Google ID
2. BrandProfile and InfluencerProfile models
3. Campaign model with status
4. Proposal model
5. Database indexes for performance
6. Seed data for testing

**Files to modify:**
- `server/src/models/User.ts`
- `server/src/models/BrandProfile.ts`
- `server/src/models/InfluencerProfile.ts`
- `server/src/models/Campaign.ts`
- `server/src/models/Proposal.ts`

---

### 🤖 Agent 4: INTEGRATIONS & DOCS

**Location:** Root + `/docs`

**Responsibilities:**
1. Google Cloud Console setup guide
2. Environment variables documentation
3. API documentation (update)
4. README with setup instructions
5. OAuth callback handling

**Files to modify:**
- `.env.example`
- `docs/API.md`
- `README.md`

---

### 🤖 Agent 5: TESTING & DEPLOYMENT

**Location:** Root

**Responsibilities:**
1. Set up Vitest for unit tests
2. Set up Playwright for E2E tests
3. GitHub Actions CI/CD workflow
4. Vercel deployment config
5. Railway deployment config

**Files to modify:**
- `vitest.config.ts`
- `playwright.config.ts`
- `.github/workflows/`
- `vercel.json`

---

## API Endpoints (To Implement)

### Auth 🔄 (Adding Google OAuth)
- POST /api/auth/google - Google OAuth callback
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile

### User Profiles
- GET /api/profile - Get current user profile
- PUT /api/profile - Update profile

### Campaigns (Brand only)
- GET /api/campaigns - List brand's campaigns
- POST /api/campaigns - Create campaign
- GET /api/campaigns/:id
- PUT /api/campaigns/:id
- DELETE /api/campaigns/:id

### Campaigns (Public - Influencer)
- GET /api/campaigns/open - List open campaigns

### Proposals (Influencer)
- POST /api/proposals - Submit proposal
- GET /api/proposals/my - My proposals
- PUT /api/proposals/:id - Update proposal

### Proposals (Brand)
- GET /api/campaigns/:id/proposals - Proposals for campaign
- PUT /api/proposals/:id/respond - Accept/reject proposal

### Influencers
- GET /api/influencers - Search/filter influencers

---

## Environment Variables

**Backend (Railway):**
- MONGODB_URI
- JWT_SECRET
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GOOGLE_CALLBACK_URL
- PORT

**Frontend (Vercel):**
- VITE_API_URL (points to Railway backend)
- VITE_GOOGLE_CLIENT_ID

---

## Key GitHub Repo

**URL:** https://github.com/WickTech/Kalakaarian

**Local Path:** `/home/rishi/github/kalakaarian`

**Deployment:**
- Frontend: Vercel
- Backend: Railway
- Database: MongoDB (Railway)
