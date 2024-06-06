# Use the official OpenJDK as a parent image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the application JAR file into the container
COPY target/wailes1-0.0.1-SNAPSHOT.jar /app/wailes1-0.0.1-SNAPSHOT.jar

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "/app/wailes1-0.0.1-SNAPSHOT.jar"]
