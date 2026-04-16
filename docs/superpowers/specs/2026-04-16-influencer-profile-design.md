# Influencer Profile Page Design

**Date:** 2026-04-16  
**Status:** Approved

## Overview

Build a comprehensive Influencer Profile Page accessible from the Marketplace, with analytics, premium membership system, and video upload for task completion.

## Features

### 1. Profile Header
- **Profile Image**: Display from Instagram/social or custom upload; click to edit
- **Name & Handle**: Full name and social handle display
- **Active Status Toggle**: Green indicator when online; toggle switch to turn on/off
- **Tier Badge**: Visual badge showing Gold (premium), Silver (basic), or Regular
- **Edit Profile Button**: Navigate to edit profile page

### 2. Analytics Section (Mock Data)
- **ER% (Engagement Rate)**: `((likes + comments + shares) / reach) * 100`
- **Avg Views**: Average views across recent posts
- **CPV (Cost Per View)**: `campaign cost / avg views`
- **Fake Followers %**: Percentage of fake/inactive followers (from Modash or manual input)

### 3. Premium Membership System
- **Membership Tiers**:
  - Gold (₹149/month): Top banner placement, profile boost, highest visibility
  - Silver (free with purchase): 2x-3x selection chances
  - Regular: Basic profile
- **Features**:
  - Cancel anytime (auto-debit mode)
  - Payment via Razorpay/Stripe
  - Profile boost for Gold members (shown in top banner)
- **Backend Model: Membership**
  ```typescript
  {
    influencerId: ObjectId,
    tier: 'gold' | 'silver' | 'regular',
    startDate: Date,
    endDate: Date,
    autoRenew: boolean,
    paymentId: string
  }
  ```

### 4. Social Stats Section
- **Instagram Stats** (if connected):
  - Follower count, avg engagement
  - Recent posts grid with thumbnails
- **YouTube Stats** (if connected):
  - Subscriber count, view counts
  - Recent videos grid

### 5. Video Upload Section (Task Completion)
- **Upload Options**:
  - Video link (Instagram/YouTube)
  - Direct file upload
  - Drive link
- **Workflow**: Creator uploads → Execution team reviews → Approved/Rejected with feedback
- **Backend Model: CampaignVideo**
  ```typescript
  {
    influencerId: ObjectId,
    campaignId: ObjectId,
    videoUrl: string,
    platform: 'instagram' | 'youtube' | 'file',
    status: 'pending' | 'approved' | 'revision',
    feedback?: string,
    uploadedAt: Date
  }
  ```

### 6. Refer & Earn System
- **Mechanics**: 10 creators take Gold membership → 1 free year Gold; Silver referrals → free Silver
- **Single referral code** valid for lifetime
- **Backend Model: Referral**
  ```typescript
  {
    referrerId: ObjectId,
    referredId: ObjectId,
    rewardType: 'gold_year' | 'silver_free',
    used: boolean
  }
  ```

### 7. Marketplace Integration
- **InfluencerCard** → Navigate to `/influencer/:id`
- **Quick render** from passed data, fetch full profile on mount
- **Cart action** still available from profile page

## Backend Changes

### New Models
1. **Membership**: tier, startDate, endDate, autoRenew, paymentId
2. **CampaignVideo**: influencerId, campaignId, videoUrl, platform, status, feedback
3. **Referral**: referrerId, referredId, rewardType, used
4. **InfluencerAnalytics**: ER%, fakeFollowers%, CPV, calculated fields

### New Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/influencers/:id` | Full profile with analytics |
| PUT | `/api/influencers/:id/active-status` | Toggle online status |
| POST | `/api/membership/purchase` | Purchase membership |
| GET | `/api/membership/status` | Get current membership |
| PUT | `/api/membership/cancel` | Cancel auto-renew |
| POST | `/api/videos` | Upload campaign video |
| PUT | `/api/videos/:id/review` | Review video (execution team) |
| POST | `/api/referrals` | Create referral |
| GET | `/api/referrals/stats` | Referral statistics |

## Frontend Pages/Components

### New Pages
1. **InfluencerProfile** (`/influencer/:id`) - Full profile view
2. **MembershipPage** (`/membership`) - Purchase/manage membership
3. **VideoUpload** - Modal/page for uploading videos

### Component Updates
1. **InfluencerCard** - Add click handler for navigation
2. **Marketplace** - Pass influencer data for quick render

## Tech Stack Additions
- **File Upload**: AWS S3 or local storage for video uploads
- **Payment**: Razorpay SDK integration
- **State Management**: React Query for membership/video data

## Implementation Order

1. Backend models and routes
2. Frontend InfluencerProfile page
3. Analytics display (mock data)
4. Active status toggle
5. Membership UI and purchase flow
6. Video upload section
7. Refer & Earn system
8. Marketplace integration

## Success Criteria
- Influencer can view their full profile from marketplace
- Analytics display with mock calculations
- Membership purchase flow works end-to-end
- Video upload workflow functional
- Refer & Earn code generation works
