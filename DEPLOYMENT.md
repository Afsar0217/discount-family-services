# Render Blueprint Deployment Guide

## Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **PostgreSQL Database**: Set up a PostgreSQL database (you can use Render's managed PostgreSQL)
3. **Twilio Account**: For SMS functionality (optional but recommended)
4. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, etc.)

## Step-by-Step Deployment Process

### Step 1: Prepare Your Database

1. **Create PostgreSQL Database on Render**:
   - Go to Render Dashboard
   - Click "New" → "PostgreSQL"
   - Choose a name (e.g., `discount-family-services-db`)
   - Select your preferred region
   - Choose a plan (Free tier works for development)
   - Click "Create Database"

2. **Copy Database URL**:
   - Once created, go to your database dashboard
   - Copy the "External Database URL"
   - Save it for later use

### Step 2: Deploy Using Blueprint

1. **Connect Your Repository**:
   - Go to Render Dashboard
   - Click "New" → "Blueprint"
   - Connect your Git repository
   - Select the repository containing your code

2. **Configure Blueprint**:
   - Render will automatically detect the `render.yaml` file
   - Review the configuration
   - Click "Apply"

3. **Set Environment Variables**:
   - After the blueprint is applied, you'll need to configure environment variables
   - Go to each service and add the required environment variables

### Step 3: Configure Environment Variables

#### Backend Service (`discount-family-services-api`)

**Required Variables**:
```
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
PORT=4000
```

#### Frontend Service (`discount-family-services-frontend`)

**Required Variables**:
```
VITE_API_URL=https://your-backend-service-name.onrender.com
```

**Optional Variables** (for SMS functionality):
```
VITE_TWILIO_ACCOUNT_SID=your_twilio_account_sid
VITE_TWILIO_AUTH_TOKEN=your_twilio_auth_token
VITE_TWILIO_PHONE_NUMBER=your_twilio_phone_number
VITE_TWILIO_MESSAGING_SERVICE_SID=your_messaging_service_sid
VITE_SMS_MESSAGE_FORMAT=minimal
VITE_SMS_ENABLED=true
VITE_CENTRAL_NOTIFICATION_PHONE=your_central_phone_number
```

**Vendor Phone Numbers** (add as needed):
```
VITE_VENDOR_DR_RAO_HOSPITAL_PHONE=9876543210
VITE_VENDOR_PHARMACY_RAJU_PHONE=9876543210
# ... add all other vendor phone numbers
```

### Step 4: Deploy and Test

1. **Monitor Deployment**:
   - Watch the deployment logs for both services
   - Ensure both services deploy successfully

2. **Test Your Application**:
   - Frontend URL: `https://discount-family-services-frontend.onrender.com`
   - Backend URL: `https://discount-family-services-api.onrender.com`
   - Health Check: `https://discount-family-services-api.onrender.com/health`

3. **Verify Database Connection**:
   - Check the backend logs for database connection success
   - Test the `/api/bookings` endpoint

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
| `VITE_TWILIO_ACCOUNT_SID` | Twilio Account SID | No |
| `VITE_TWILIO_AUTH_TOKEN` | Twilio Auth Token | No |
| `VITE_TWILIO_PHONE_NUMBER` | Twilio Phone Number | No |
| `VITE_SMS_ENABLED` | Enable/disable SMS | No |
| `VITE_CENTRAL_NOTIFICATION_PHONE` | Central notification phone | No |

## Troubleshooting

### Common Issues

1. **Database Connection Failed**:
   - Verify `DATABASE_URL` is correct
   - Check if database is accessible from Render
   - Ensure SSL is properly configured

2. **CORS Errors**:
   - Backend is configured to allow requests from the frontend domain
   - Check if the frontend URL is correct in CORS configuration

3. **Build Failures**:
   - Check build logs for missing dependencies
   - Ensure all required environment variables are set

4. **SMS Not Working**:
   - Verify Twilio credentials are correct
   - Check if SMS is enabled (`VITE_SMS_ENABLED=true`)
   - Verify phone numbers are in correct format

### Useful Commands

```bash
# Check backend health
curl https://your-backend-service.onrender.com/health

# Test API endpoint
curl https://your-backend-service.onrender.com/api/bookings

# Check frontend build
curl https://your-frontend-service.onrender.com
```

## Post-Deployment

1. **Set up Custom Domain** (Optional):
   - Go to your frontend service settings
   - Add custom domain if needed

2. **Monitor Performance**:
   - Use Render's built-in monitoring
   - Set up alerts for downtime

3. **Backup Strategy**:
   - Enable automatic backups for your PostgreSQL database
   - Set up regular backups of your application data

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to your repository
2. **Database Security**: Use strong passwords and restrict access
3. **API Security**: Consider adding rate limiting and authentication
4. **HTTPS**: Render automatically provides SSL certificates

## Support

- **Render Documentation**: [docs.render.com](https://docs.render.com)
- **Render Support**: Available through your Render dashboard
- **Community**: [Render Community](https://community.render.com) 