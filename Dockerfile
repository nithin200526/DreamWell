# ---------------- Backend Build Stage ----------------
    FROM maven:3.9.1-amazoncorretto-21 AS backend-build
    WORKDIR /app
    COPY backend/pom.xml .
    RUN mvn dependency:go-offline -B
    COPY backend/src ./src
    RUN mvn clean package -DskipTests
    
    # ---------------- Frontend Build Stage ----------------
    FROM node:20-alpine AS frontend-build
    WORKDIR /app
    COPY frontend/package*.json ./
    RUN npm ci
    COPY frontend/ ./
    RUN npm run build
    
    # ---------------- Final Runtime Stage ----------------
    FROM eclipse-temurin:21-jdk AS runtime
    RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
    WORKDIR /app
    COPY --from=backend-build /app/target/*.jar app.jar
    COPY --from=frontend-build /app/build ./backend/src/main/resources/static
    RUN groupadd -r dreamwell && useradd -r -g dreamwell dreamwell
    RUN chown -R dreamwell:dreamwell /app
    USER dreamwell
    EXPOSE 8081
    HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
      CMD curl -f http://localhost:8081/api/health || exit 1
    ENV SPRING_PROFILES_ACTIVE=prod
    ENV JAVA_OPTS="-Xmx512m -Xms256m"
    ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]