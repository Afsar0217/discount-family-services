# Troubleshooting Deployment Issues

## Common Issues and Solutions

### 1. Missing Twilio Credentials Error

**Error**: `Missing Twilio credentials`

**Solution**: This is expected if you haven't configured SMS functionality. The app will work without Twilio.

**To fix (optional)**:
1. Set up a Twilio account
2. Add these environment variables to your frontend:
   ```
   VITE_TWILIO_ACCOUNT_SID=your_account_sid
   VITE_TWILIO_AUTH_TOKEN=your_auth_token
   VITE_TWILIO_PHONE_NUMBER=your_twilio_phone
   VITE_SMS_ENABLED=true
   ```

### 2. 404 Error on API Endpoint

**Error**: `POST https://your-backend.onrender.com//api/bookings 404 (Not Found)`

**Causes**:
- Double slash in URL (fixed in latest update)
- Backend service not running
- Wrong API URL

**Solutions**:

#### Check Backend Health
```bash
curl https://your-backend-service-name.onrender.com/health
```

#### Verify API URL
1. Check your frontend environment variable:
   ```
   VITE_API_URL=https://your-backend-service-name.onrender.com
   ```
   (No trailing slash)

2. Test the API endpoint:
   ```bash
   curl https://your-backend-service-name.onrender.com/api/bookings
   ```

#### Check Backend Logs
1. Go to your Render dashboard
2. Click on your backend service
3. Check the "Logs" tab for errors

### 3. Backend Service Not Starting

**Check these in your backend service on Render**:

1. **Environment Variables**:
   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   NODE_ENV=production
   PORT=4000
   ```

2. **Build Command**: `npm install`
3. **Start Command**: `npm start`
4. **Root Directory**: `backend`

### 4. Database Connection Issues

**Error**: `Database error` or connection timeout

**Solutions**:
1. Verify `DATABASE_URL` is correct
2. Check if PostgreSQL service is running
3. Ensure SSL is configured properly

### 5. CORS Errors

**Error**: `CORS policy` or `Access-Control-Allow-Origin`

**Solution**: Backend is configured to allow common deployment domains. If you're using a custom domain, update the CORS configuration.

## Testing Your Deployment

### 1. Test Backend Health
```bash
curl https://your-backend-service-name.onrender.com/health
```
Expected response:
```json
{
  "status": "OK",
  "timestamp": "2025-07-31T...",
  "environment": "production",
  "port": 4000
}
```

### 2. Test API Endpoint
```bash
curl https://your-backend-service-name.onrender.com/api/bookings
```
Expected response: `[]` (empty array if no bookings)

### 3. Test Frontend
- Open your frontend URL
- Try to log in
- Navigate through the app
- Try booking a service

## Environment Variables Checklist

### Backend (Web Service)
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `NODE_ENV` - Set to `production`
- [ ] `PORT` - Set to `4000`

### Frontend (Static Site)
- [ ] `VITE_API_URL` - Backend service URL (no trailing slash)
- [ ] `VITE_SMS_ENABLED` - Set to `true` or `false`
- [ ] `VITE_SMS_MESSAGE_FORMAT` - Set to `minimal`

### Optional SMS Variables
- [ ] `VITE_TWILIO_ACCOUNT_SID`
- [ ] `VITE_TWILIO_AUTH_TOKEN`
- [ ] `VITE_TWILIO_PHONE_NUMBER`
- [ ] `VITE_CENTRAL_NOTIFICATION_PHONE`

## Common URL Patterns

### Render URLs
- Backend: `https://your-service-name.onrender.com`
- Frontend: `https://your-site-name.onrender.com`

### Netlify URLs
- Frontend: `https://your-site-name.netlify.app`

### Vercel URLs
- Backend: `https://your-service-name.vercel.app`
- Frontend: `https://your-site-name.vercel.app`

## Debugging Steps

1. **Check Backend Logs**:
   - Go to Render dashboard
   - Click on your backend service
   - Check "Logs" tab

2. **Check Frontend Build**:
   - Go to Render dashboard
   - Click on your frontend service
   - Check "Logs" tab

3. **Test API Manually**:
   ```bash
   # Test health endpoint
   curl https://your-backend.onrender.com/health
   
   # Test bookings endpoint
   curl https://your-backend.onrender.com/api/bookings
   ```

4. **Check Environment Variables**:
   - Verify all required variables are set
   - Check for typos in URLs
   - Ensure no trailing slashes in API URL

## Getting Help

1. **Check Render Documentation**: [docs.render.com](https://docs.render.com)
2. **Check Render Community**: [community.render.com](https://community.render.com)
3. **Check Service Logs**: Always check logs first for specific error messages

## Quick Fixes

### If Backend is Not Responding
1. Check if service is running (not sleeping)
2. Verify environment variables
3. Check database connection
4. Restart the service

### If Frontend Can't Connect to Backend
1. Verify `VITE_API_URL` is correct
2. Check CORS configuration
3. Test backend health endpoint
4. Check network tab in browser dev tools

### If Database Connection Fails
1. Verify `DATABASE_URL` format
2. Check if PostgreSQL service is running
3. Ensure SSL is configured
4. Check database logs 