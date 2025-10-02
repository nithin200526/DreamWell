# DreamWell Frontend

Modern, responsive React frontend for the DreamWell AI-powered dream interpreter and mood tracker.

## 🎨 Tech Stack

- **Framework**: React 18
- **Styling**: TailwindCSS 3
- **Routing**: React Router DOM 6
- **State Management**: Context API
- **HTTP Client**: Axios
- **Charts**: Chart.js / React-Chartjs-2
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure API Endpoint**
   - Open `src/services/api.js`
   - Update `API_BASE_URL` if backend is not on `http://localhost:8080/api`

3. **Start Development Server**
   ```bash
   npm start
   ```
   - Frontend runs on: http://localhost:3000

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js       # Navigation bar with theme toggle
│   └── Footer.js       # Footer component
│
├── context/            # React Context providers
│   ├── AuthContext.js  # Authentication state
│   └── ThemeContext.js # Dark/Light theme
│
├── pages/              # Page components
│   ├── auth/          # Authentication pages
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── ForgotPassword.js
│   │   ├── ResetPassword.js
│   │   └── VerifyEmail.js
│   │
│   ├── user/          # User pages
│   │   ├── Dashboard.js
│   │   ├── DreamLog.js
│   │   ├── DreamsList.js
│   │   ├── DreamDetail.js
│   │   ├── MoodTracker.js
│   │   ├── Analytics.js
│   │   ├── Profile.js
│   │   └── Support.js
│   │
│   ├── admin/         # Admin pages
│   │   ├── AdminDashboard.js
│   │   ├── AdminUsers.js
│   │   ├── AdminDreams.js
│   │   ├── AdminSupport.js
│   │   └── AdminSettings.js
│   │
│   └── LandingPage.js # Public landing page
│
├── services/          # API services
│   └── api.js        # Axios instance & API calls
│
├── utils/            # Utility functions
│   ├── constants.js  # App constants
│   └── helpers.js    # Helper functions
│
├── App.js            # Main app component
├── index.js          # Entry point
└── index.css         # Global styles
```

## 🎯 Features

### User Features
- ✅ Authentication (Login, Signup, Email Verification, Password Reset)
- ✅ Dream Logging with AI Interpretation
- ✅ Mood Tracking with Calendar View
- ✅ Analytics Dashboard with Charts
- ✅ Profile Management
- ✅ Support Ticket System
- ✅ Dark/Light Mode
- ✅ Responsive Design (Mobile-First)

### Admin Features
- ✅ User Management (View, Block/Unblock)
- ✅ Flagged Dreams Review
- ✅ Support Ticket Management
- ✅ System Settings
- ✅ Analytics Dashboard

## 🔐 Authentication Flow

The app uses JWT tokens with refresh token mechanism:

1. **Login/Signup** → Receives access token + refresh token
2. **Access Token** → Stored in localStorage, expires in 1 hour
3. **Refresh Token** → Stored in localStorage, expires in 7 days
4. **Auto Refresh** → Axios interceptor automatically refreshes expired tokens
5. **Logout** → Clears all tokens from localStorage

## 🎨 Styling

### TailwindCSS Classes
- **Primary Color**: `primary-600` (Blue)
- **Dark Mode**: All components support `dark:` variants
- **Custom Classes**: Defined in `index.css`
  - `.btn-primary` - Primary button
  - `.btn-secondary` - Secondary button
  - `.btn-danger` - Danger button
  - `.input-field` - Input field
  - `.card` - Card container

### Theme Toggle
- Uses `ThemeContext` to manage theme state
- Persisted in localStorage
- Applies `dark` class to `<html>` element

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Bottom navigation
- Hamburger menu
- Touch-optimized UI
- Swipe gestures support

## 🔧 Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject (one-way operation)
npm run eject
```

## 🌐 API Integration

All API calls are centralized in `src/services/api.js`:

```javascript
import { dreamAPI, moodAPI, userAPI, analyticsAPI, supportAPI, adminAPI } from './services/api';

// Example: Create a dream
const response = await dreamAPI.createDream(dreamData);

// Example: Get analytics
const analytics = await analyticsAPI.getAnalytics();
```

## 🎨 Customization

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Change these values
        600: '#0ea5e9',
        // ...
      }
    }
  }
}
```

### Change App Name
Update in:
- `public/index.html` (title)
- `public/manifest.json` (name)
- `src/components/Navbar.js` (logo text)

## 🐛 Troubleshooting

### CORS Errors
- Ensure backend CORS is configured to allow `http://localhost:3000`
- Check `SecurityConfig.java` in backend

### API Connection Failed
- Verify backend is running on port 8080
- Check `API_BASE_URL` in `src/services/api.js`

### Dark Mode Not Working
- Clear browser cache
- Check localStorage for `theme` key
- Verify TailwindCSS dark mode is set to `'class'`

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📦 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Environment Variables
Create `.env` file:
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

Update `src/services/api.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
```

## 🔒 Security Best Practices

1. **Never commit sensitive data** (API keys, tokens)
2. **Use HTTPS** in production
3. **Implement CSP headers**
4. **Sanitize user inputs**
5. **Keep dependencies updated**

## 📚 Learn More

- [React Documentation](https://react.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [React Router Documentation](https://reactrouter.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - Free to use and modify

---

**Happy Coding! 🚀**
