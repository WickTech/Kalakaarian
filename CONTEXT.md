# Kalakaarian - Project Context

**Last Updated:** 2026-03-27 (Session End)

---

## Project Overview

**Kalakaarian** is India's First AI-Powered Influencer Marketplace connecting brands with micro-influencers for authentic marketing campaigns.

---

## User Flow (Updated)

```
Landing Page
    ↓
Login / Sign Up (Email + Password + Google Auth)
    ↓
┌────────────────────┬────────────────────┐
│      BRAND         │    INFLUENCER      │
├────────────────────┼────────────────────┤
│ • Browse Influencers│ • Browse Campaigns │
│ • Create Campaign  │ • Submit Proposal  │
│ • Manage Campaigns │ • Dashboard        │
│ • View Proposals   │ • Profile          │
│ • Accept/Reject    │ • Chat             │
└────────────────────┴────────────────────┘
```

---

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB + Mongoose
- **Auth:** JWT (Email/Password) + Google OAuth 2.0
- **Deployment:** Vercel (frontend) + Railway (backend)

---

## Completed Work

### Phase 1: Landing Page Updates
- ✅ Added "Why Kalakaarian?" section with 4 feature cards
- ✅ Updated meta title and description for SEO

### Phase 2: Frontend-Backend API Integration
Fixed critical API mismatches:
- ✅ Fixed `/api/auth/me` → `/api/auth/profile`
- ✅ Fixed `/api/brand/campaigns` → `/api/campaigns`
- ✅ Fixed Proposal field: `offeredAmount` → `bidAmount`
- ✅ Fixed Campaign field: `niche` → `genre`
- ✅ Connected BrandDashboard to real API
- ✅ Connected BrowseCampaigns to real API
- ✅ Connected CampaignDetails to real API
- ✅ Connected SubmitProposal to real API
- ✅ Connected InfluencerDashboard to real API
- ✅ Connected Marketplace to searchInfluencers API

### Phase 3: Messaging System
- ✅ Created Message and Conversation models
- ✅ Created message API routes (send, get conversations, get messages, mark read)
- ✅ Added messaging APIs to frontend client
- ✅ **Built Messaging UI (`/messages`)** with conversation list and chat area.

### Phase 4: Analytics Dashboard
- ✅ Created analytics routes for brand and influencer
- ✅ Added campaign stats, proposal stats, earnings tracking

### Phase 5: Login/Signup Flow
- ✅ Combined login/signup on same page
- ✅ Role selection for sign up (Influencer/Brand)
- ✅ Direct navigation to registration pages
- ✅ Simplified registration forms
- ✅ **Restored Google OAuth** with safety checks for environment variables.

### Phase 6: Brand Dashboard Completion
- ✅ Added "View Proposals" functionality.
- ✅ **Implemented Accept/Reject proposal UI** with real API integration.

---

## Current Status

| Component | Status | Notes |
|-----------|--------|-------|
| Frontend | ⚠️ | Build passing, but "Blank Screen" issue reported by user |
| Backend | ✅ | API endpoints ready |
| MongoDB | ✅ | Connected (Atlas/Railway) |
| Deployment | ✅ | Vercel + Railway |

---

## Known Issues

1. **Blank Screen on Load:** Investigating `main.tsx` and `useAuth.tsx` for runtime crashes (likely related to Google Provider or LocalStorage parsing).
2. **Payment Integration:** Still pending (Phase 10).
3. **Analytics UI:** APIs ready, but visualization (charts) not yet implemented.

---

## Recent Session Fixes (2026-03-27)
1. **Google Auth:** Wrapped `App` in `GoogleOAuthProvider` but added a safety check to bypass if `clientId` is missing to prevent crashes.
2. **Missing Types:** Defined `LoginResponse` interface in `api.ts`.
3. **API Alignment:** Updated `respondToProposal` to use `POST /api/proposals/:id/respond`.
4. **Messaging:** Created `Messages.tsx` and connected all chat APIs.

---

## Project Structure

```
kalakaarian/
├── client/                    # Frontend (Vite + React)
│   ├── src/
│   │   ├── pages/            # Page components
│   │   │   ├── Messages.tsx  (NEW)
│   │   │   ├── LoginPage.tsx (UPDATED with Google Auth)
│   │   │   ├── BrandDashboard.tsx (UPDATED with Proposal Management)
│   │   │   └── ...
│   │   ├── hooks/
│   │   │   └── useAuth.tsx
│   │   └── lib/
│   │       └── api.ts
└── server/                   # Backend (Express)
```
