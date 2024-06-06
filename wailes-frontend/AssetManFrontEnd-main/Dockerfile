# Use the official Node.js 16 image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./


# Copy the rest of the application code
COPY . .

# Change ownership of the application directory
RUN chown -R node:node /app


EXPOSE 3000

# Use a non-root user
USER node

# Command to start the application
CMD ["npm", "start"]
