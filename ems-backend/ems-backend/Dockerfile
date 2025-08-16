# Stage 1: Build
FROM eclipse-temurin:17-alpine AS build

WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Copy source code
COPY src src

# Give execute permission to mvnw
RUN chmod +x mvnw

# Build the app
RUN ./mvnw clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:17-alpine

WORKDIR /app

# Copy the built jar from the first stage
COPY --from=build /app/target/ems-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port (Railway will assign its own)
EXPOSE 8080

# Run the jar
ENTRYPOINT ["java","-jar","app.jar"]
