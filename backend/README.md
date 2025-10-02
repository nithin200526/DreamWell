# DreamWell Backend

AI-powered dream interpreter and mood tracker backend built with Spring Boot.

## Tech Stack

- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: MySQL (XAMPP)
- **Authentication**: JWT + Refresh Tokens
- **AI Integration**: Groq API
- **Email**: Gmail SMTP

## Prerequisites

1. **Java 17** or higher
2. **Maven** 3.6+
3. **XAMPP** (MySQL + phpMyAdmin)
4. **Groq API Key** (free trial)
5. **Gmail App Password** (for email)

## Setup Instructions

### 1. Start XAMPP

- Open XAMPP Control Panel
- Start **Apache** and **MySQL**
- Open phpMyAdmin: `http://localhost/phpmyadmin`

### 2. Configure Application

Edit `src/main/resources/application.properties`:

```properties
# Database (update if needed)
spring.datasource.url=jdbc:mysql://localhost:3306/dreamwell?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=

# JWT Secret (change in production)
jwt.secret=your-secret-key-minimum-256-bits

# Email Configuration
spring.mail.username=your-email@gmail.com
spring.mail.password=your-gmail-app-password

# Groq API
groq.api.key=your-groq-api-key-here

# Admin Credentials
app.admin.email=admin@dreamwell.com
app.admin.password=Admin@123
```

### 3. Get Groq API Key

1. Visit: https://console.groq.com/
2. Sign up for free account
3. Generate API key
4. Copy key to `application.properties`

### 4. Setup Gmail SMTP

1. Enable 2-Factor Authentication in Gmail
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use app password in `application.properties`

### 5. Build and Run

```bash
# Navigate to backend directory
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on: `http://localhost:8080/api`

### 6. Verify Database

- Open phpMyAdmin: `http://localhost/phpmyadmin`
- Check if `dreamwell` database is created
- Verify tables are created automatically

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/auth/verify-email?token=` - Verify email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Dreams
- `POST /api/dreams` - Log new dream
- `GET /api/dreams` - Get all user dreams
- `GET /api/dreams/{id}` - Get dream by ID
- `PUT /api/dreams/{id}` - Update dream
- `DELETE /api/dreams/{id}` - Delete dream
- `GET /api/dreams/search?keyword=` - Search dreams
- `POST /api/dreams/{id}/reinterpret` - Re-run AI interpretation

### Mood Tracking
- `POST /api/moods` - Create mood entry
- `GET /api/moods` - Get all mood entries
- `GET /api/moods/range?startDate=&endDate=` - Get mood entries by date range
- `PUT /api/moods/{id}` - Update mood entry
- `DELETE /api/moods/{id}` - Delete mood entry

### User Profile
- `GET /api/user/profile` - Get current user profile
- `PUT /api/user/profile` - Update profile
- `PUT /api/user/password` - Change password
- `DELETE /api/user/account` - Delete account

### Analytics
- `GET /api/analytics` - Get user analytics
- `GET /api/analytics/export` - Export data as CSV

### Support
- `POST /api/support/tickets` - Create support ticket
- `GET /api/support/tickets` - Get user tickets
- `GET /api/support/tickets/{id}` - Get ticket by ID

### Admin (Requires ADMIN/SUPER_ADMIN role)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/{id}` - Get user by ID
- `PUT /api/admin/users/{id}/toggle-status` - Block/Unblock user
- `GET /api/admin/users/{id}/data` - Get user dreams and moods
- `GET /api/admin/dreams/flagged` - Get flagged dreams
- `GET /api/admin/analytics` - Get system analytics
- `GET /api/admin/support/tickets` - Get all support tickets
- `POST /api/admin/support/tickets/{id}/reply` - Reply to ticket
- `PUT /api/admin/support/tickets/{id}/status` - Update ticket status
- `GET /api/admin/settings/{key}` - Get system setting
- `PUT /api/admin/settings/{key}` - Update system setting

## Default Admin Credentials

- **Email**: admin@dreamwell.com
- **Password**: Admin@123

**⚠️ Change these credentials in production!**

## Testing

```bash
# Run tests
mvn test
```

## Troubleshooting

### Database Connection Error
- Ensure XAMPP MySQL is running
- Check database credentials in `application.properties`
- Verify port 3306 is not blocked

### Email Not Sending
- Verify Gmail app password is correct
- Check if 2FA is enabled on Gmail
- Test with a different email service if needed

### Groq API Error
- Verify API key is valid
- Check if you have remaining credits
- Review API rate limits

## Project Structure

```
backend/
├── src/main/java/com/dreamwell/
│   ├── config/          # Configuration classes
│   ├── controller/      # REST controllers
│   ├── dto/            # Data Transfer Objects
│   ├── entity/         # JPA entities
│   ├── exception/      # Exception handlers
│   ├── repository/     # JPA repositories
│   ├── security/       # Security & JWT
│   └── service/        # Business logic
├── src/main/resources/
│   └── application.properties
├── database/
│   └── schema.sql      # Database schema reference
├── pom.xml
└── README.md
```

## License

MIT License
