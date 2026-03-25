# Kalakariaan - D2C Influencer Marketplace

A platform connecting D2C brands with micro-influencers for authentic marketing campaigns.

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcrypt
- **Container:** Docker + Docker Compose

## Project Structure

```
├── server/                  # Express API server
├── src/                     # React frontend
├── docs/                    # Documentation
├── infra/                   # Docker setup
└── models/                  # Shared models
```

## Quick Start

1. Clone repository
2. Run `docker-compose up -d`
3. Access frontend at http://localhost:3000
4. Access API at http://localhost:5000/api

## Features

- [x] User authentication (JWT)
- [x] Brand/influencer roles
- [x] Campaign management
- [x] Proposal workflow
- [x] Shopping cart
- [ ] Escrow payment system
- [ ] Real-time messaging

---

## Documentation

| File | Description |
|------|-------------|
| [API.md](./API.md) | Complete API documentation with examples |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System architecture, data flow, security |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | Common issues and solutions |
| [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) | Pre-deployment verification |
| [MONGODB.md](./MONGODB.md) | MongoDB setup guide |
| [RAILWAY.md](./RAILWAY.md) | Railway deployment guide |
| [VERCEL.md](./VERCEL.md) | Vercel deployment guide |

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/profile | Get current user |
| PUT | /api/auth/profile | Update user profile |

### Influencers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/influencers | List all influencers |
| GET | /api/influencers/:id | Get influencer details |
| GET | /api/influencers/search | Search influencers |
| PUT | /api/influencers/profile | Update profile |

### Campaigns
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/campaigns | List campaigns |
| GET | /api/campaigns/:id | Get campaign details |
| POST | /api/campaigns | Create campaign |
| PUT | /api/campaigns/:id | Update campaign |
| DELETE | /api/campaigns/:id | Delete campaign |

### Proposals
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/campaigns/:id/proposals | Submit proposal |
| GET | /api/campaigns/:id/proposals | Get proposals |
| PUT | /api/campaigns/proposals/:id/status | Update status |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/cart | Get cart |
| POST | /api/cart/add | Add item |
| DELETE | /api/cart/remove/:id | Remove item |
| DELETE | /api/cart/clear | Clear cart |
| PUT | /api/cart/update/:id | Update item |

[See full API docs](./API.md)
