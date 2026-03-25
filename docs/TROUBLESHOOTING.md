# Troubleshooting Guide

Common issues and solutions for Kalakariaan D2C Influencer Marketplace.

---

## MongoDB Connection Problems

### Issue: `ECONNREFUSED 127.0.0.1:27017`

**Symptoms:** Backend fails to start with connection refused error.

**Solutions:**
1. Ensure MongoDB is running:
   ```bash
   docker ps | grep mongo
   ```
2. Start MongoDB container:
   ```bash
   docker-compose up -d mongo
   ```
3. Verify connection string in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/kalakaarian
   ```

### Issue: `Authentication failed`

**Symptoms:** MongoDB connection fails with authentication error.

**Solutions:**
1. Verify credentials in `.env`:
   ```
   MONGODB_URI=mongodb://username:password@host:27017/kalakaarian
   ```
2. Create user in MongoDB:
   ```javascript
   use kalakaarian
   db.createUser({
     user: "admin",
     pwd: "password",
     roles: [{ role: "readWrite", db: "kalakaarian" }]
   })
   ```

### Issue: `Database selection failed`

**Symptoms:** Cannot connect to specific database.

**Solutions:**
1. Ensure database exists:
   ```javascript
   use kalakaarian
   ```
2. Check MongoDB logs:
   ```bash
   docker logs mongo
   ```

---

## CORS Errors

### Issue: `Access-Control-Allow-Origin` error

**Symptoms:** Browser blocks API requests with CORS error.

**Solutions:**
1. Check backend CORS configuration in `server/app.ts`:
   ```typescript
   app.use(cors({
     origin: ['http://localhost:3000', 'https://yourdomain.com'],
     credentials: true
   }));
   ```
2. Add correct origin to allowed list in `.env`:
   ```
   CORS_ORIGIN=http://localhost:3000
   ```
3. For production, ensure exact domain match (no wildcards).

---

## JWT Token Issues

### Issue: `Token expired`

**Symptoms:** API returns 401 with "Token expired" message.

**Solutions:**
1. Check token expiration in `.env`:
   ```
   JWT_EXPIRES_IN=24h
   ```
2. Implement refresh token flow:
   ```javascript
   // Refresh token endpoint
   app.post('/api/auth/refresh', async (req, res) => {
     const { refreshToken } = req.body;
     // Verify and issue new access token
   });
   ```

### Issue: `Invalid token`

**Symptoms:** 401 Unauthorized with "invalid token" error.

**Solutions:**
1. Verify JWT_SECRET matches between services:
   ```
   JWT_SECRET=your-secret-key
   ```
2. Check token format (Bearer prefix required):
   ```
   Authorization: Bearer eyJhbGci...
   ```
3. Ensure token is not malformed (check for extra spaces).

### Issue: `Payload too large`

**Symptoms:** JWT error when payload exceeds size limit.

**Solutions:**
1. Keep JWT payload minimal (only user ID):
   ```javascript
   const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '24h' });
   ```
2. Store additional data in database, not in token.

---

## Docker Build Failures

### Issue: `npm install failed`

**Symptoms:** Docker build fails during dependency installation.

**Solutions:**
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```
2. Remove node_modules and lock files:
   ```bash
   rm -rf node_modules package-lock.json
   ```
3. Rebuild with no cache:
   ```bash
   docker-compose build --no-cache
   ```

### Issue: `Port already in use`

**Symptoms:** Container fails to start due to port conflict.

**Solutions:**
1. Check what's using the port:
   ```bash
   lsof -i :5000
   ```
2. Stop conflicting service or change port in docker-compose.yml:
   ```yaml
   ports:
     - "5001:5000"
   ```

### Issue: `Volume mount permission denied`

**Symptoms:** Container cannot access mounted volume.

**Solutions:**
1. Fix permissions:
   ```bash
   sudo chown -R $USER:$USER .
   ```
2. Use named volumes instead of bind mounts in docker-compose.yml.

---

## Deployment Issues

### Issue: Frontend builds but shows blank page

**Symptoms:** Vercel deployment completes but app is blank.

**Solutions:**
1. Check build output directory in `vite.config.ts`:
   ```typescript
   build: {
     outDir: 'dist'
   }
   ```
2. Add correct base path for subdirectory deployment:
   ```typescript
   base: '/'
   ```
3. Check for console errors in browser DevTools.

### Issue: 404 on page refresh (SPA)

**Symptoms:** Direct navigation to routes returns 404.

**Solutions:**
1. For Vercel: Add `vercel.json`:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/" }]
   }
   ```
2. For Nginx: Add rewrite rule:
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

### Issue: Environment variables not loading

**Symptoms:** App uses undefined values for env vars.

**Solutions:**
1. For Vercel: Add env vars in Project Settings > Environment Variables
2. Prefix React variables with `VITE_`:
   ```
   VITE_API_URL=https://api.yourdomain.com
   ```
3. Rebuild after adding new environment variables

---

## Authentication Issues

### Issue: `User type mismatch`

**Symptoms:** Brand cannot access influencer features or vice versa.

**Solutions:**
1. Check user role in database:
   ```javascript
   db.users.findOne({ email: "user@example.com" })
   ```
2. Verify role field: use `role` not `userType`

### Issue: Session not persisting

**Symptoms:** User gets logged out on page refresh.

**Solutions:**
1. Check token storage (localStorage vs cookies)
2. Verify cookies are not being cleared
3. Ensure CORS credentials are enabled:
   ```typescript
   app.use(cors({ origin: '...', credentials: true }));
   ```

---

## Performance Issues

### Issue: Slow API responses

**Symptoms:** API calls take >2 seconds.

**Solutions:**
1. Add database indexes:
   ```javascript
   db.influencers.createIndex({ niche: 1, followers: -1 })
   db.campaigns.createIndex({ status: 1, createdAt: -1 })
   ```
2. Enable query caching
3. Check MongoDB connection pool size

### Issue: Memory leaks in development

**Symptoms:** Server memory grows over time.

**Solutions:**
1. Restart dev server periodically
2. Check for unclosed database connections
3. Clear MongoDB connection pool:
   ```javascript
   mongoose.connection.on('disconnected', () => {
     console.log('Disconnected from MongoDB');
   });
   ```

---

## Getting Help

If you continue to experience issues:

1. Check server logs:
   ```bash
   docker-compose logs backend
   ```
2. Check MongoDB logs:
   ```bash
   docker-compose logs mongo
   ```
3. Verify all environment variables are set correctly
4. Ensure minimum system requirements are met:
   - Node.js 18+
   - Docker 20+
   - MongoDB 5.0+
