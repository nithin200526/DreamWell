# 🚀 DreamWell - Complete Setup Guide

Welcome to DreamWell! This guide will help you set up and run the complete application.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- ✅ **Java 17 or higher** - [Download](https://www.oracle.com/java/technologies/downloads/)
- ✅ **Maven 3.6+** - [Download](https://maven.apache.org/download.cgi)
- ✅ **Node.js 16+** - [Download](https://nodejs.org/)
- ✅ **XAMPP** (for MySQL) - [Download](https://www.apachefriends.org/)
- ✅ **Groq API Key** (free) - [Get Key](https://console.groq.com/)
- ✅ **Gmail App Password** (for emails) - [Setup Guide](https://support.google.com/accounts/answer/185833)

---

## 🗄️ Step 1: Setup Database (XAMPP MySQL)

### 1.1 Start XAMPP
1. Open **XAMPP Control Panel**
2. Click **Start** next to **Apache**
3. Click **Start** next to **MySQL**

### 1.2 Verify MySQL
1. Open browser and go to: `http://localhost/phpmyadmin`
2. You should see phpMyAdmin dashboard
3. The database `dreamwell` will be created automatically by Spring Boot

---

## ⚙️ Step 2: Configure Backend

### 2.1 Navigate to Backend
```bash
cd d:/xampp/htdocs/DreamWell/backend
```

### 2.2 Configure Application Properties
Open `src/main/resources/application.properties` and update:

```properties
# Database Configuration (Update if needed)
spring.datasource.url=jdbc:mysql://localhost:3306/dreamwell?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=

# JWT Secret (CHANGE THIS IN PRODUCTION!)
jwt.secret=your-super-secret-key-minimum-256-bits-for-security

# Gmail SMTP Configuration
spring.mail.username=your-email@gmail.com
spring.mail.password=your-gmail-app-password

# Groq API Key
groq.api.key=your-groq-api-key-here

# Admin Credentials (CHANGE IN PRODUCTION!)
app.admin.email=admin@dreamwell.com
app.admin.password=Admin@123
```

### 2.3 Get Groq API Key
1. Visit: https://console.groq.com/
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and paste it in `application.properties`

### 2.4 Setup Gmail App Password
1. Go to your Google Account: https://myaccount.google.com/
2. Enable **2-Factor Authentication** if not already enabled
3. Go to: https://myaccount.google.com/apppasswords
4. Generate an app password for "Mail"
5. Copy the 16-character password
6. Paste it in `application.properties` (remove spaces)

---

## 🏗️ Step 3: Build and Run Backend

### 3.1 Build the Project
```bash
cd d:/xampp/htdocs/DreamWell/backend
mvn clean install
```

This will:
- Download all dependencies
- Compile the code
- Run tests
- Create a JAR file

### 3.2 Run the Backend
```bash
mvn spring-boot:run
```

**Expected Output:**
```
Started DreamWellApplication in X seconds
```

**Backend is now running on:** `http://localhost:8080/api`

### 3.3 Verify Backend
Open browser and visit:
- Health Check: `http://localhost:8080/api/actuator/health` (if actuator is enabled)
- Or check console for "Started DreamWellApplication"

---

## 🎨 Step 4: Setup Frontend

### 4.1 Navigate to Frontend
Open a **NEW terminal/command prompt** (keep backend running):

```bash
cd d:/xampp/htdocs/DreamWell/frontend
```

### 4.2 Install Dependencies
```bash
npm install
```

This will install:
- React and React DOM
- TailwindCSS
- React Router
- Axios
- Chart.js
- And all other dependencies

**Note:** This may take 2-5 minutes depending on your internet speed.

### 4.3 Start Frontend
```bash
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view dreamwell-frontend in the browser.
Local: http://localhost:3000
```

**Frontend is now running on:** `http://localhost:3000`

Your browser should automatically open to `http://localhost:3000`

---

## ✅ Step 5: Test the Application

### 5.1 Create an Account
1. Go to: `http://localhost:3000`
2. Click **Sign Up**
3. Fill in:
   - Name: Your Name
   - Email: your-email@example.com
   - Password: (at least 6 characters)
4. Click **Create Account**

### 5.2 Verify Email (Optional)
- Check your email for verification link
- Click the link to verify
- Or skip and continue (verification is optional for testing)

### 5.3 Log Your First Dream
1. Click **Log Dream** button
2. Fill in:
   - Title: "Flying Over Mountains"
   - Dream Text: "I was soaring through the sky, feeling completely free..."
   - Select Mood: 😊 Happy
   - Sleep Quality: 4/5
3. Click **Log Dream & Get Interpretation**
4. Wait for AI analysis (5-10 seconds)
5. View your dream interpretation!

### 5.4 Track Your Mood
1. Go to **Mood Tracker**
2. Select today's mood
3. Add optional notes
4. Click **Save Mood Entry**

### 5.5 View Analytics
1. Go to **Analytics**
2. See your dream statistics
3. View mood trends
4. Export data as CSV

### 5.6 Test Admin Panel
1. Logout from your account
2. Login with admin credentials:
   - Email: `admin@dreamwell.com`
   - Password: `Admin@123`
3. Click **Admin** in navigation
4. Explore admin features

---

## 🎯 Common Issues & Solutions

### ❌ Backend Won't Start

**Issue:** Port 8080 already in use
```
Solution: Stop other applications using port 8080
Or change port in application.properties:
server.port=8081
```

**Issue:** Database connection error
```
Solution:
1. Ensure MySQL is running in XAMPP
2. Check database credentials in application.properties
3. Verify port 3306 is not blocked
```

**Issue:** Maven build fails
```
Solution:
1. Check Java version: java -version (should be 17+)
2. Clear Maven cache: mvn clean
3. Delete .m2 folder and rebuild
```

### ❌ Frontend Won't Start

**Issue:** Port 3000 already in use
```
Solution: 
Kill process on port 3000 or use different port
The app will prompt you to use a different port
```

**Issue:** npm install fails
```
Solution:
1. Delete node_modules and package-lock.json
2. Run: npm cache clean --force
3. Run: npm install
```

**Issue:** API calls fail (CORS error)
```
Solution:
1. Ensure backend is running on port 8080
2. Check API_BASE_URL in src/services/api.js
3. Verify CORS settings in SecurityConfig.java
```

### ❌ Email Not Sending

**Issue:** Authentication failed
```
Solution:
1. Verify 2FA is enabled on Gmail
2. Generate new App Password
3. Use App Password, not regular password
4. Remove spaces from App Password
```

### ❌ Groq API Errors

**Issue:** Invalid API key
```
Solution:
1. Verify API key is correct
2. Check for extra spaces
3. Ensure you have remaining credits
4. Visit console.groq.com to check status
```

**Issue:** Rate limit exceeded
```
Solution:
Wait a few minutes and try again
Free tier has rate limits
```

---

## 🔧 Development Tips

### Hot Reload
- **Backend**: Changes require restart (or use Spring DevTools)
- **Frontend**: Changes auto-reload in browser

### Debugging Backend
```bash
# Run with debug logs
mvn spring-boot:run -Dspring-boot.run.arguments=--logging.level.com.dreamwell=DEBUG
```

### Debugging Frontend
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab for API calls

### Database Management
- Access phpMyAdmin: `http://localhost/phpmyadmin`
- View tables, data, and run queries
- Database name: `dreamwell`

---

## 📦 Production Deployment

### Backend Deployment

#### Option 1: JAR File
```bash
# Build JAR
mvn clean package

# Run JAR
java -jar target/dreamwell-backend-1.0.0.jar
```

#### Option 2: Docker
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/dreamwell-backend-1.0.0.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

#### Option 3: Cloud Platforms
- **Heroku**: Use Heroku Maven plugin
- **AWS**: Deploy to Elastic Beanstalk
- **Google Cloud**: Deploy to App Engine

### Frontend Deployment

#### Build for Production
```bash
cd frontend
npm run build
```

#### Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd frontend
netlify deploy --prod --dir=build
```

#### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod
```

### Environment Variables
Create `.env.production`:
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] Change JWT secret in `application.properties`
- [ ] Change admin password
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS
- [ ] Update CORS settings to production URL
- [ ] Set up database backups
- [ ] Enable rate limiting
- [ ] Review and update security headers
- [ ] Set up monitoring and logging

---

## 📚 Additional Resources

### Documentation
- **Backend README**: `backend/README.md`
- **Frontend README**: `frontend/README.md`
- **Complete Guide**: `COMPLETE_PROJECT_GUIDE.md`
- **Database Schema**: `backend/database/schema.sql`

### API Documentation
- Base URL: `http://localhost:8080/api`
- Swagger UI: (Add springdoc-openapi for auto-generated docs)

### Tech Stack Documentation
- [Spring Boot](https://spring.io/projects/spring-boot)
- [React](https://react.dev)
- [TailwindCSS](https://tailwindcss.com)
- [Groq API](https://console.groq.com/docs)

---

## 🎉 Success!

If you've followed all steps, you should now have:

✅ Backend running on `http://localhost:8080/api`
✅ Frontend running on `http://localhost:3000`
✅ Database created in MySQL
✅ Admin account created
✅ AI dream interpretation working
✅ All features functional

### Next Steps:
1. **Customize** the app (colors, branding, features)
2. **Test** all features thoroughly
3. **Deploy** to production
4. **Share** with users!

---

## 🆘 Need Help?

If you encounter issues:

1. Check this guide carefully
2. Review error messages in console
3. Check backend logs
4. Verify all prerequisites are installed
5. Ensure all services are running

---

## 🤝 Contributing

Want to improve DreamWell?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

MIT License - Free to use and modify

---

**Congratulations on setting up DreamWell! 🎊**

Happy dream interpreting! 🌙✨
