# Kalakaarian - Project Context

**Last Updated:** 2026-03-27

---

## Project Overview

**Kalakaarian** is India's First AI-Powered Influencer Marketplace connecting brands with micro-influencers for authentic marketing campaigns.

---

## User Flow (Updated)

```
Landing Page
    ↓
Login / Sign Up (Email + Password)
    ↓
┌────────────────────┬────────────────────┐
│      BRAND         │    INFLUENCER      │
├────────────────────┼────────────────────┤
│ • Browse Influencers│ • Browse Campaigns │
│ • Create Campaign  │ • Submit Proposal  │
│ • Manage Campaigns │ • Dashboard        │
│ • View Proposals   │ • Profile          │
└────────────────────┴────────────────────┘
```

---

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB + Mongoose
- **Auth:** JWT (Email/Password)
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

### Phase 4: Analytics Dashboard
- ✅ Created analytics routes for brand and influencer
- ✅ Added campaign stats, proposal stats, earnings tracking

### Phase 5: Login/Signup Flow
- ✅ Combined login/signup on same page
- ✅ Role selection for sign up (Influencer/Brand)
- ✅ Direct navigation to registration pages
- ✅ Simplified registration forms

---

## Current Status

| Component | Status | Notes |
|-----------|--------|-------|
| Frontend | ✅ | Landing + Auth flow working |
| Backend | ✅ | API endpoints ready |
| MongoDB | 🔧 | Needs to be running |
| Deployment | ✅ | Vercel + Railway |

---

## Known Issues

1. **Login requires backend** - MongoDB must be running
2. **Google OAuth** - Removed (needs credentials setup)
3. **Some UI polish needed** - Campaign details, proposals management

---

## Future Planned Phases

### Phase 6: Complete Brand Dashboard
- [ ] Campaign detail view with proposals list
- [ ] Accept/reject proposal functionality
- [ ] Campaign editing/deletion
- [ ] Campaign analytics visualization

### Phase 7: Complete Influencer Dashboard
- [ ] Profile completion flow
- [ ] Proposal status tracking
- [ ] Earnings dashboard

### Phase 8: Messaging UI
- [ ] Create messaging component
- [ ] Conversation list UI
- [ ] Real-time chat (optional)

### Phase 9: Search & Filter
- [ ] Better influencer search with filters
- [ ] AI-based matching suggestions
- [ ] Saved searches/favorites

### Phase 10: Payment Integration
- [ ] Payment gateway
- [ ] Escrow system
- [ ] Payout system for influencers

### Phase 11: Notifications
- [ ] In-app notifications
- [ ] Email notifications

---

## API Endpoints

### Auth
- `POST /api/auth/register` - Email registration
- `POST /api/auth/login` - Email login
- `GET /api/auth/profile` - Get current user
- `PUT /api/auth/profile` - Update profile

### Campaigns
- `GET /api/campaigns` - List brand's campaigns
- `POST /api/campaigns` - Create campaign
- `GET /api/campaigns/open` - List open campaigns
- `GET /api/campaigns/:id` - Get campaign details
- `PUT /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign

### Proposals
- `POST /api/campaigns/:id/proposals` - Submit proposal
- `GET /api/proposals/my` - My proposals
- `GET /api/campaigns/:id/proposals` - Proposals for campaign
- `PUT /api/proposals/:id/status` - Accept/reject proposal

### Influencers
- `GET /api/influencers` - Search/filter influencers
- `GET /api/influencers/:id` - Get influencer profile
- `PUT /api/influencers/profile` - Update profile

### Messaging
- `POST /api/messages/send` - Send message
- `GET /api/messages/conversations` - List conversations
- `GET /api/messages/conversations/:id` - Get messages
- `PUT /api/messages/conversations/:id/read` - Mark read

### Analytics
- `GET /api/analytics/brand` - Brand analytics
- `GET /api/analytics/influencer` - Influencer analytics

---

## Project Structure

```
kalakaarian/
├── client/                    # Frontend (Vite + React)
│   ├── src/
│   │   ├── pages/            # Page components
│   │   │   ├── Landing.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── BrandRegisterPage.tsx
│   │   │   ├── InfluencerRegisterPage.tsx
│   │   │   ├── BrandDashboard.tsx
│   │   │   ├── InfluencerDashboard.tsx
│   │   │   ├── BrowseCampaigns.tsx
│   │   │   ├── CampaignDetails.tsx
│   │   │   ├── SubmitProposal.tsx
│   │   │   └── Marketplace.tsx
│   │   ├── hooks/            # Custom hooks
│   │   │   └── useAuth.tsx
│   │   └── lib/              # Utilities
│   │       └── api.ts        # API client
│   └── index.html
├── server/                   # Backend (Express)
│   ├── src/
│   │   ├── routes/           # API routes
│   │   ├── controllers/      # Route handlers
│   │   ├── models/           # MongoDB models
│   │   │   ├── User.ts
│   │   │   ├── Campaign.ts
│   │   │   ├── Proposal.ts
│   │   │   ├── InfluencerProfile.ts
│   │   │   ├── BrandProfile.ts
│   │   │   ├── Message.ts
│   │   │   └── Conversation.ts
│   │   └── middleware/       # Auth, error handling
│   └── .env
├── package.json              # pnpm workspace root
├── pnpm-lock.yaml
└── CONTEXT.md                # This file
```

---

## Environment Variables

### Backend (`server/.env`)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kalakaarian
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_client_id        # Optional
GOOGLE_CLIENT_SECRET=your_client_secret # Optional
CORS_ORIGIN=http://localhost:5173
```

### Frontend (`client/.env`)
```
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_client_id   # Optional
```

---

## Commands

```bash
# Navigate to project
cd /home/rishi/github/kalakaarian

# Install dependencies
pnpm install

# Run frontend locally
cd client && pnpm dev

# Run backend locally
cd server && pnpm dev

# Build frontend
cd client && pnpm build

# Build backend
cd server && pnpm build
```

---

## Recent Commits

```
778b571 fix: navigate to registration pages on signup
b3b1f79 fix: navigate to registration pages on signup
acd2fbf refactor: update login page with combined login/signup flow
acc8275 feat: add analytics for brands and influencers
0c294ad feat: add messaging between brands and influencers
ee46c90 fix: connect frontend to backend APIs - remove mock data
```

---

## Troubleshooting

### Login not working
1. Ensure MongoDB is running
2. Ensure backend server is running
3. Check `.env` configuration

### Build errors
1. Run `pnpm install` to update dependencies
2. Check for TypeScript errors: `pnpm build`

### Vercel deployment fails
1. Run `pnpm install` locally first
2. Commit updated `pnpm-lock.yaml`
