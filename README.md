# 🌙 DreamWell - AI Dream Interpreter & Mood Tracker

AI-powered dream interpretation and mood tracking application for better mental wellness.

## ✨ Features

- 🤖 **AI Dream Interpretation** - Powered by Groq AI (Llama 3.3)
- 📊 **Mood Tracking** - Track daily moods and emotional patterns
- 📈 **Analytics Dashboard** - Visualize trends and insights
- 🔒 **Privacy First** - All dreams are private by default
- 🎨 **Dark Mode** - Beautiful UI with dark/light theme
- 📱 **Responsive Design** - Works on all devices
- 🔐 **Secure Authentication** - JWT-based auth with refresh tokens
- 📧 **Email Verification** - Password reset and email verification
- 🎫 **Support System** - Built-in help center and ticketing

## 🚀 Tech Stack

### Backend
- **Java 21** with Spring Boot 3.2
- **MySQL** database
- **Spring Security** with JWT
- **Groq AI API** for dream interpretation
- **Maven** for dependency management

### Frontend
- **React 18** with React Router
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API calls
- **React Hot Toast** for notifications

## 📋 Prerequisites

- **Java 21** or higher
- **Node.js 18+** and npm
- **MySQL 8.0+** (XAMPP recommended for local development)
- **Maven 3.6+**
- **Groq API Key** (free at https://console.groq.com)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/dreamwell.git
cd dreamwell
```

### 2. Set Up Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your Groq API key
GROQ_API_KEY=your-actual-groq-api-key-here
```

### 3. Set Up Backend

```bash
cd backend

# The application will use environment variables
# Make sure GROQ_API_KEY is set in your environment or .env file

# For Windows PowerShell:
$env:GROQ_API_KEY="your-groq-api-key"

# For Linux/Mac:
export GROQ_API_KEY="your-groq-api-key"

# Start MySQL (XAMPP or standalone)
# The database 'dreamwell' will be created automatically

# Run the backend
mvn spring-boot:run
```

Backend will start on: `http://localhost:8081/api`

### 4. Set Up Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

Frontend will start on: `http://localhost:3000`

## 🔑 Environment Variables

Create a `.env` file in the root directory (or set system environment variables):

```env
# Required
GROQ_API_KEY=your-groq-api-key-here

# Optional (defaults provided)
JWT_SECRET=your-jwt-secret-key
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-gmail-app-password
```

## 📖 Usage

### Default Admin Account
- **Email:** admin@dreamwell.com
- **Password:** Admin@123

### User Features
1. **Sign Up** - Create a new account
2. **Log Dreams** - Write down your dreams with mood and sleep quality
3. **Get AI Interpretation** - Instant AI-powered dream analysis
4. **Track Mood** - Log daily moods and identify patterns
5. **View Analytics** - See trends, recurring symbols, and correlations
6. **Manage Profile** - Update settings, theme, and preferences

### Admin Features
1. **User Management** - View and manage users
2. **Dream Moderation** - Review flagged dreams
3. **Support Tickets** - Respond to user support requests
4. **System Settings** - Configure application settings

## 🚢 Deployment

### Recommended: Vercel (Frontend) + Railway (Backend)

#### Frontend (Vercel)
```bash
# Push to GitHub
git push origin main

# Deploy to Vercel
# 1. Go to vercel.com
# 2. Import your repository
# 3. Set build command: npm run build
# 4. Set output directory: build
# 5. Add environment variable: REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

#### Backend (Railway)
```bash
# Push to GitHub
git push origin main

# Deploy to Railway
# 1. Go to railway.app
# 2. Import your repository
# 3. Add MySQL database
# 4. Set environment variables:
#    - GROQ_API_KEY
#    - SPRING_DATASOURCE_URL (from Railway MySQL)
#    - SPRING_DATASOURCE_USERNAME (from Railway)
#    - SPRING_DATASOURCE_PASSWORD (from Railway)
```

## 📁 Project Structure

```
DreamWell/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/dreamwell/
│   │       ├── config/      # Configuration classes
│   │       ├── controller/  # REST controllers
│   │       ├── dto/         # Data transfer objects
│   │       ├── entity/      # JPA entities
│   │       ├── repository/  # Data repositories
│   │       ├── security/    # Security config
│   │       └── service/     # Business logic
│   └── src/main/resources/
│       └── application.properties
├── frontend/                # React frontend
│   ├── public/
│   └── src/
│       ├── components/      # Reusable components
│       ├── context/         # React context
│       ├── pages/           # Page components
│       ├── services/        # API services
│       └── utils/           # Utility functions
├── .env.example            # Environment variables template
├── .gitignore
└── README.md
```

## 🔒 Security

- Passwords are hashed with BCrypt
- JWT tokens for authentication
- CORS configured for frontend origin
- SQL injection prevention with JPA
- XSS protection enabled
- HTTPS recommended for production

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- **Help Center:** Visit `/support` in the app
- **Email:** support@dreamwell.com
- **Issues:** GitHub Issues

## 🙏 Acknowledgments

- **Groq AI** for dream interpretation API
- **Spring Boot** for backend framework
- **React** for frontend library
- **Tailwind CSS** for styling

---

Made with ❤️ for better mental health
