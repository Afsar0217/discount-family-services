# Render Manual Deployment Guide (100% Free)

## Why Manual Deployment?

Render Blueprint requires payment for web services, but manual deployment allows you to use the free tier for both backend and frontend.

## Step-by-Step Free Deployment

### Step 1: Create PostgreSQL Database (Free)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "PostgreSQL"
3. Choose a name: `discount-family-services-db`
4. Select your region
5. Choose **Free** plan
6. Click "Create Database"
7. Copy the **External Database URL**

### Step 2: Deploy Backend (Free)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `discount-family-services-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free** (750 hours/month)

5. Add Environment Variables:
   ```
   DATABASE_URL=your_postgresql_external_url
   NODE_ENV=production
   PORT=4000
   ```

6. Click "Create Web Service"

### Step 3: Deploy Frontend (Free)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Static Site"
3. Connect your GitHub repository
4. Configure the site:
   - **Name**: `discount-family-services-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

5. Add Environment Variables:
   ```
   VITE_API_URL=https://your-backend-service-name.onrender.com
   VITE_SMS_ENABLED=true
   VITE_SMS_MESSAGE_FORMAT=minimal
   ```

6. Click "Create Static Site"

### Step 4: Test Your Deployment

1. **Backend Health Check**: `https://your-backend-service-name.onrender.com/health`
2. **Frontend URL**: `https://your-frontend-service-name.onrender.com`
3. **API Endpoint**: `https://your-backend-service-name.onrender.com/api/bookings`

## Environment Variables Reference

### Backend Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NODE_ENV` | Environment (production/development) | Yes |
| `PORT` | Server port (default: 4000) | No |

### Frontend Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes |
| `VITE_SMS_ENABLED` | Enable/disable SMS | No |
| `VITE_SMS_MESSAGE_FORMAT` | SMS format (minimal/standard) | No |

## Free Tier Limits

### Backend (Web Service)
- **750 hours/month** (about 31 days)
- **512 MB RAM**
- **Shared CPU**
- **Automatic sleep** after 15 minutes of inactivity

### Frontend (Static Site)
- **Unlimited** hosting
- **Global CDN**
- **Automatic deployments**
- **Custom domains**

### Database (PostgreSQL)
- **1 GB storage**
- **No automatic backups** (free tier)
- **Shared resources**

## Troubleshooting

### Common Issues

1. **Backend Sleep**: Free tier services sleep after inactivity
   - First request may take 30-60 seconds to wake up
   - Consider upgrading to paid plan for always-on service

2. **Database Connection**: Ensure `DATABASE_URL` is correct
   - Use the External Database URL from your PostgreSQL service
   - Check SSL configuration

3. **CORS Issues**: Backend is configured to allow Render domains
   - Frontend URL should be in the allowed origins

### Performance Tips

1. **Keep Backend Awake**: Use a service like UptimeRobot to ping your backend
2. **Optimize Build**: Frontend builds are cached for faster deployments
3. **Monitor Usage**: Check your Render dashboard for usage statistics

## Alternative Free Platforms

If Render's free tier limits don't work for you:

### Railway (Recommended)
- **$5/month credit** (enough for small projects)
- **Always-on services**
- **Better performance**

### Vercel
- **Unlimited** static sites
- **Serverless functions** (free tier)
- **Excellent performance**

### Netlify
- **Unlimited** static sites
- **Serverless functions** (free tier)
- **Great developer experience**

## Next Steps

1. **Choose your platform** (Render manual, Railway, or Vercel)
2. **Follow the deployment steps**
3. **Configure environment variables**
4. **Test your application**
5. **Set up monitoring** (optional)

## Support

- **Render Documentation**: [docs.render.com](https://docs.render.com)
- **Railway Documentation**: [docs.railway.app](https://docs.railway.app)
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify Documentation**: [docs.netlify.com](https://docs.netlify.com) 