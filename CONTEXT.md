# Kalakaarian - Project Context

**Last Updated:** 2026-04-08

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
- **Deployment:** Vercel (frontend + backend serverless)

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

### Phase 7: Deployment Configuration (2026-04-08)
- ✅ Separated Vercel configs for client and server
- ✅ Created `client/vercel.json` with Vite framework config
- ✅ Created `server/vercel.json` with Node framework config
- ✅ Removed conflicting root `vercel.json`
- ✅ Fixed TypeScript type definitions (moved @types to dependencies)
- ✅ Exported serverless handler for Vercel serverless functions

### Phase 8: Header & Logo Updates (2026-04-08)
- ✅ Simplified header - removed Login/Cart buttons
- ✅ Added logo image (k-logo-no-bg.png) in header
- ✅ Added "KALAKAARIAN" text beside logo with original styling
- ✅ Removed theme toggle from header (kept in landing page)
- ✅ Set no-background logo as browser favicon

### Phase 9: Influencer Registration & Marketplace Enhancement (2026-04-08)
- ✅ **Profile Image Handling:**
  - Added optional profile image upload in influencer registration
  - Added default avatar fallback (DiceBear)
  - New influencers automatically appear in marketplace
- ✅ **Removed Unnecessary Metrics:**
  - Removed follower count, Instagram followers, YouTube subscribers, engagement rate from forms and schema
- ✅ **Marketplace Visibility:**
  - All newly registered influencers automatically visible in marketplace
- ✅ **Data Fields:**
  - Full Name, Username/Handle, Bio, Category/Niche, Social Media Links, Location, Profile Image with default fallback
- ✅ **Updated Backend Schema:**
  - Added `profileImage` field to InfluencerProfile
  - Removed `followerCount`, `followers`, `engagementRate` fields
  - Updated types and controllers
- ✅ **Updated Frontend:**
  - InfluencerRegisterPage with image upload, removed follower fields
  - Marketplace uses API data with profile images
  - InfluencerCard simplified to show profile image, name, handle, tier, niche, city

### Phase 10: Dynamic Tier Counts (2026-04-08)
- ✅ Added `GET /api/influencers/tier-counts` endpoint
- ✅ Landing page fetches live tier counts from API
- ✅ Shows "Loading..." while fetching
- ✅ Shows "X Active Influencers" with proper singular/plural
- ✅ Counts update automatically when new influencers register

---

## Current Status

| Component | Status | Notes |
|-----------|--------|-------|
| Frontend | ✅ | Build passing, landing page with dynamic tiers |
| Backend | ✅ | API endpoints ready, serverless handler configured |
| MongoDB | ✅ | Connected (Atlas/Railway) |
| Deployment | ✅ | Vercel (frontend + backend serverless) |

---

## Known Issues

1. ~~Blank Screen on Load~~ - FIXED
2. ~~Marketplace showing no data~~ - FIXED
3. Payment Integration: Still pending
4. Analytics UI: APIs ready but visualization not yet implemented

---

## Recent Session Fixes (2026-04-08)

### Deployment Configuration
- Created separate vercel.json for client and server
- Fixed TypeScript type definitions (@types moved to dependencies)
- Configured serverless-http handler export

### Header Updates
- Simplified header with logo and "Get Started" button
- Added theme toggle back
- Set logo as favicon
- Used no-background logo in header

### Influencer System
- Added profile image upload to registration
- Removed follower count metrics (not required per business logic)
- Added dynamic tier counts API
- Updated marketplace UI with live counts

---

## Full Website Audit (2026-04-08)

### Frontend Pages - Status
| Page | Status | Notes |
|------|--------|-------|
| Landing.tsx | ✅ Working | Main landing with dynamic tier counts |
| LoginPage.tsx | ✅ Working | Login + Signup flow |
| RoleSelectPage.tsx | ✅ Working | Role selection |
| InfluencerRegisterPage.tsx | ✅ Working | With profile image upload |
| BrandRegisterPage.tsx | ✅ Working | Registration form |
| Marketplace.tsx | ✅ Working | Connected to API |
| BrandDashboard.tsx | ✅ Working | Campaign + proposal management |
| InfluencerDashboard.tsx | ✅ Working | Proposals + profile |
| BrowseCampaigns.tsx | ✅ Working | List open campaigns |
| CampaignDetails.tsx | ✅ Working | Campaign info + submit |
| SubmitProposal.tsx | ✅ Working | Proposal form |
| CreateCampaign.tsx | ✅ Working | Create new campaign |
| Messages.tsx | ✅ Working | Chat UI |
| MyProfile.tsx | ✅ Working | Profile view |
| EditInfluencerProfile.tsx | ✅ Working | Edit profile |
| EditBrandProfile.tsx | ✅ Working | Edit profile |

### Backend API - Status
| Endpoint | Status |
|----------|--------|
| Auth (register, login, profile) | ✅ Working |
| Campaigns CRUD | ✅ Working |
| Proposals CRUD | ✅ Working |
| Influencers (search, tier-counts) | ✅ Working |
| Messages | ✅ Working |
| Analytics | ✅ Working |
| Cart | ✅ Working |

---

## Upcoming Features (Pending Implementation)

### Phase 11: Social Media Integration & Tier Classification
**Status: Planned (Brainstorming phase)**

1. **Social Media Data Integration**
   - Integrate with Instagram and YouTube APIs (or manual input fallback)
   - Fetch follower count, subscriber count, recent posts/videos
   - Implement periodic background jobs for data refresh

2. **Follower-Based Tier System**
   - Auto-classify based on total audience size:
     - Nano: 2K - 25K followers
     - Micro: 25K - 250K followers
     - Macro: 250K - 3M followers
     - Celebrity: 3M+ followers
   - Tier badge colors: Nano (Gray), Micro (Blue), Macro (Purple), Celebrity (Gold)

3. **Influencer Profile Page**
   - Dedicated detail page from marketplace
   - Display: profile info, social stats, tier badge, social links

4. **Content Aggregation & Display**
   - Fetch influencer content (Instagram posts, YouTube videos)
   - Grid layout with thumbnails, titles, metrics
   - Pagination/lazy loading

5. **Backend Requirements**
   - Update schema for `instagram_followers`, `youtube_subscribers`, `tier`, `social_content`
   - Create APIs for profile with content, sync social data

6. **Implementation Approach (Hybrid)**
   - Start with manual input fallback (simpler)
   - API-ready architecture for future integration

---

## Project Structure

```
kalakaarian/
├── client/                    # Frontend (Vite + React)
│   ├── src/
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # React hooks
│   │   ├── lib/              # API client & stores
│   │   └── components/       # Reusable UI components
│   ├── public/                # Static assets (logos, favicon)
│   └── vercel.json           # Vercel config for frontend
└── server/                   # Backend (Express + TypeScript)
    └── src/
        ├── routes/           # API endpoints
        ├── controllers/      # Business logic
        ├── models/           # MongoDB models
        └── middleware/       # Auth, validation
    └── vercel.json           # Vercel config for backend
```

---

## How to Run

```bash
cd /home/rishi/github/kalakaarian

# Install dependencies
pnpm install

# Frontend (runs on port 8080)
cd client && pnpm dev

# Backend (runs on port 3000, needs MongoDB)
cd server && pnpm dev
```

---

## Session Summary (2026-04-08)

### Today's Work Completed:
1. Fixed Vercel deployment - separated client/server configs
2. Updated header - logo + simplified buttons
3. Enhanced influencer registration - profile image, removed follower fields
4. Added dynamic tier counts - live API data in marketplace UI
5. Updated documentation

### Tomorrow's Tasks:
1. **Continue Social Media Integration** (brainstorming → design → implementation)
   - Schema updates for follower counts
   - Tier auto-calculation
   - Influencer profile page
   - Content aggregation display

---

*Context saved for future session resume.*
