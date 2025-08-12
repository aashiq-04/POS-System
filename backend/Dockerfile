# backend/Dockerfile
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
RUN mvn clean package -DskipTests
COPY pom.xml .
COPY src ./src

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
