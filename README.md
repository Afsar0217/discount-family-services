# Discount Family Services

A comprehensive web application for managing family service bookings with SMS notifications and vendor management.

## 🚀 Features

- **Family Member Management**: Select family members for service bookings
- **Service Categories**: Healthcare, Banking, Shopping, Food, Automobile, and more
- **SMS Notifications**: Automatic SMS alerts to vendors and family members
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Real-time Booking**: Instant booking confirmation and vendor notifications
- **Location-based Services**: Support for multiple service locations

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **React Router** for navigation

### Backend
- **Node.js** with Express
- **PostgreSQL** for data storage
- **Twilio** for SMS functionality
- **CORS** enabled for cross-origin requests

## 📱 Mobile Responsive

The application is fully optimized for mobile devices with:
- Responsive design that adapts to all screen sizes
- Touch-friendly interface
- Optimized text sizing and spacing
- Mobile-first approach

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Twilio account (for SMS functionality)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd discount-family-services
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd backend && npm install
   cd ..
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:4000

## 📁 Project Structure

```
discount-family-services/
├── src/
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── config/             # Configuration files
│   ├── utils/              # Utility functions
│   └── contexts/           # React contexts
├── backend/
│   ├── server.js           # Express server
│   └── package.json        # Backend dependencies
├── render.yaml             # Render deployment configuration
├── DEPLOYMENT.md           # Detailed deployment guide
└── package.json            # Frontend dependencies
```

## 🔧 Configuration

### Environment Variables

See `.env.example` for all available environment variables.

### Database Setup

The application automatically creates the required database tables on startup.

### SMS Configuration

To enable SMS notifications:
1. Set up a Twilio account
2. Configure Twilio environment variables
3. Set `VITE_SMS_ENABLED=true`

## 📱 Mobile Optimization

The application includes comprehensive mobile optimizations:
- Responsive grid layouts
- Touch-friendly buttons
- Optimized text sizing
- Mobile-specific spacing
- Break-word handling for long text

## 📖 Documentation

- [API Documentation](backend/server.js) - Backend API endpoints
- [Component Documentation](src/components/) - React component structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For deployment issues, see the [Deployment Guide](DEPLOYMENT.md) or check the [Render Documentation](https://docs.render.com).

---

**Built with ❤️ for family service management** 