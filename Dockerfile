# Stage 1: Build the React frontend
# This stage installs all dependencies (including devDependencies),
# and runs the build script to generate static assets.
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Use 'npm ci' for faster, more reliable builds in CI/CD environments
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the static frontend assets
RUN npm run build


# Stage 2: Production server
# This stage creates a small, secure image to run the application.
FROM node:20-alpine

ENV NODE_ENV=production
# Google Cloud Run injects a PORT environment variable, which your server should use.
# 8080 is a common default.
ENV PORT=8080

WORKDIR /app

# Create a non-root user for security best practices
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js .
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080

# The "start" script in your package.json will run the server
CMD [ "npm", "start" ]
