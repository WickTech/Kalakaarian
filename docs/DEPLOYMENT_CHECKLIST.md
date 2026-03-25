# Deployment Checklist

Pre-deployment verification checklist for Kalakariaan D2C Influencer Marketplace.

---

## Infrastructure Setup

### MongoDB Atlas
- [ ] MongoDB Atlas account created
- [ ] Cluster created (M0 free tier or higher)
- [ ] Database user created with readWrite permissions
- [ ] Network access configured (allow all IPs or specific Vercel IPs)
- [ ] Connection string obtained (SRV or standard)
- [ ] Connection tested from local environment

### Railway
- [ ] Railway account connected (GitHub OAuth)
- [ ] Project created for backend
- [ ] Environment variables configured:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `JWT_EXPIRES_IN`
  - `NODE_ENV=production`
  - `PORT=5000`
- [ ] Railway domain assigned

### Vercel
- [ ] Vercel account connected (GitHub OAuth)
- [ ] Frontend project imported
- [ ] Environment variables configured:
  - `VITE_API_URL` (Railway domain)
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Framework preset: Vite

---

## Environment Variables

### Backend (.env)
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/kalakaarian
JWT_SECRET=<generate-secure-random-string>
JWT_EXPIRES_IN=24h
CORS_ORIGIN=https://your-vercel-domain.vercel.app
```

### Frontend (.env)
```
VITE_API_URL=https://your-railway-domain.up.railway.app/api
```

---

## Security Configuration

### CORS
- [ ] Backend CORS whitelist includes production frontend URL
- [ ] Credentials enabled for cross-origin requests

### JWT
- [ ] Secure JWT_SECRET generated (min 32 characters)
- [ ] Token expiration set appropriately (24h recommended)
- [ ] Refresh token mechanism implemented (optional)

### Environment
- [ ] No hardcoded secrets in source code
- [ ] All sensitive values in environment variables
- [ ] `.env` file added to `.gitignore`

---

## Application Configuration

### Backend
- [ ] Port configuration uses environment variable
- [ ] Database connection uses environment variable
- [ ] Error handling returns appropriate status codes
- [ ] Request validation enabled on all endpoints

### Frontend
- [ ] API base URL points to production backend
- [ ] Build output directory is correct (`dist`)
- [ ] SPA routing handled (vercel.json configured)

---

## Testing

### Pre-deployment Tests
- [ ] User registration works
- [ ] User login works and returns JWT
- [ ] Protected routes reject unauthenticated requests
- [ ] Influencer listing returns data
- [ ] Campaign CRUD operations work
- [ ] Cart operations work (add, remove, update, clear)
- [ ] Proposal submission works

### Manual Testing Checklist
- [ ] Register as brand
- [ ] Register as influencer
- [ ] Create campaign as brand
- [ ] Submit proposal as influencer
- [ ] Accept/reject proposal as brand
- [ ] Add influencer to cart
- [ ] Complete checkout flow

---

## Build Verification

### Backend Build
- [ ] `npm run build` completes without errors
- [ ] TypeScript compilation succeeds
- [ ] No linting errors

### Frontend Build
- [ ] `npm run build` completes without errors
- [ ] No console errors in build output
- [ ] All routes render correctly

### Docker Build
- [ ] `docker-compose build` succeeds
- [ ] All containers start without errors
- [ ] Health checks pass

---

## Production Readiness

### Performance
- [ ] Database indexes created for frequently queried fields
- [ ] API response times acceptable (<2 seconds)
- [ ] Frontend loads without blocking

### Monitoring
- [ ] Error logging configured
- [ ] Uptime monitoring set up
- [ ] Log retention policy defined

### Backup
- [ ] MongoDB Atlas automated backups enabled
- [ ] Backup retention configured (7 days minimum)

---

## Deployment Steps

### 1. Prepare Environment
```bash
# Clone repository
git clone https://github.com/WickTech/kalakaarian.git
cd kalakaarian

# Create .env files
cp .env.example .env
# Edit with production values
```

### 2. Deploy Backend (Railway)
```bash
# Connect GitHub repo to Railway
# Set environment variables in Railway dashboard
# Deploy from Railway dashboard
```

### 3. Deploy Frontend (Vercel)
```bash
# Import GitHub repo to Vercel
# Configure build settings
# Add environment variables
# Deploy from Vercel dashboard
```

### 4. Verify Deployment
```bash
# Test API endpoint
curl https://your-railway-domain.up.railway.app/api/health

# Test frontend
curl https://your-domain.vercel.app
```

---

## Rollback Procedure

If deployment fails:

1. **Railway**: Use dashboard to redeploy previous version
2. **Vercel**: Use dashboard to promote previous deployment
3. **MongoDB**: Restore from backup if needed

---

## Post-Deployment

- [ ] Update documentation with production URLs
- [ ] Set up custom domain (optional)
- [ ] Configure SSL certificates
- [ ] Test all critical user flows
- [ ] Monitor error logs for 24 hours
- [ ] Document any issues encountered
