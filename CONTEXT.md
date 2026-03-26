# Kalakariaan Project Context

**Last Updated:** 2026-03-25

## Project Overview

**Kalakariaan** is a D2C Influencer Marketplace connecting brands with micro-influencers for authentic marketing campaigns.

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB + Mongoose (Railway)
- **Auth:** JWT + bcrypt
- **Deployment:** Vercel (frontend) + Railway (backend)

## Current Status

| Component | Status |
|-----------|--------|
| Frontend | 🟡 Partial - Main pages done, dashboards missing |
| Backend | 🟡 Partial - proposalController not implemented |
| Database | ✅ Models ready, connection working |
| Testing | 🔴 Almost empty |
| Docs | ✅ Complete |

---

## Next Steps by Agent

### 🤖 Agent 1: FRONTEND

**Priority 1:**
1. Fix AuthProvider - already added to main.tsx
2. Complete BrandCampaignPage (currently stub)
3. Build Brand Dashboard page (view/manage campaigns, proposals)
4. Build Influencer Dashboard page (view my proposals, stats)

**Priority 2:**
5. Connect proposal API (frontend API client missing)
6. Add Profile/Edit Profile pages
7. Campaign Detail page

**Priority 3:**
8. Messages/Chat UI
9. Notifications UI

---

### 🤖 Agent 2: BACKEND

**Priority 1:**
1. **Implement proposalController** - All endpoints return 501
   - getProposals
   - getProposalById
   - createProposal
   - updateProposal
   - deleteProposal
   - respondToProposal

**Priority 2:**
2. Add messaging endpoints (POST /api/messages)
3. Add notification endpoints (GET /api/notifications)
4. Add analytics endpoints for campaign performance

**Priority 3:**
5. Email notifications
6. WebSocket for real-time features

---

### 🤖 Agent 3: DATABASE

**Priority 1:**
1. Create seed data script for testing
   - Sample users (brands + influencers)
   - Sample campaigns
   - Sample proposals

**Priority 2:**
2. Add database indexes for performance
3. Create migration scripts (if schema changes needed)

**Priority 3:**
4. Setup MongoDB Atlas backup (if not using Railway managed)

---

### 🤖 Agent 4: TESTING

**Priority 1:**
1. Write unit tests for authController
2. Write unit tests for campaignController
3. Write unit tests for influencerController

**Priority 2:**
4. Write unit tests for frontend hooks (useAuth, useCart)
5. Write component tests for key UI components

**Priority 3:**
6. Setup E2E tests with Playwright
7. Add test coverage reporting

---

### 🤖 Agent 5: DOCUMENTATION

**Priority 1:**
1. Update API.md if new endpoints added
2. Update README with live URLs

**Priority 2:**
3. Add setup guide for local development
4. Add CONTRIBUTING.md with coding standards

**Priority 3:**
5. Create video tutorial (optional)

---

## Quick Wins (Can be done in 1 session)

| Task | Agent | Effort |
|------|-------|--------|
| Implement proposalController | Backend | High |
| Build Brand Dashboard | Frontend | Medium |
| Build Influencer Dashboard | Frontend | Medium |
| Seed data script | Database | Low |
| Auth tests | Testing | Medium |

---

## Key Files

- Frontend entry: `src/main.tsx`
- Backend entry: `server/app.ts`
- Database config: `server/config/database.ts`
- Auth middleware: `server/middleware/auth.ts`
- Context: `CONTEXT.md`

## API Endpoints (Working)

### Auth ✅
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile
- PUT /api/auth/profile

### Influencers ✅
- GET /api/influencers
- GET /api/influencers/:id
- GET /api/influencers/search

### Campaigns ✅
- GET /api/campaigns
- POST /api/campaigns
- GET /api/campaigns/:id
- PUT /api/campaigns/:id
- DELETE /api/campaigns/:id
- POST /api/campaigns/:id/proposals

### Cart ✅
- GET /api/cart
- POST /api/cart/add
- DELETE /api/cart/remove/:id
- DELETE /api/cart/clear

### Proposals ❌ (NOT IMPLEMENTED)
- All endpoints return 501

---

## Environment Variables

**Backend (Railway):**
- MONGODB_URI
- JWT_SECRET
- PORT

**Frontend (Vercel):**
- VITE_API_URL (points to Railway backend)
