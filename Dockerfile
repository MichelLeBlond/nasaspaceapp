
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

WORKDIR /app/server

# Create a non-root user for security best practices
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy only the necessary files from the builder stage
# Copy frontend build assets. Your server.js should serve from a 'public' or 'dist' folder.
COPY --from=builder /app/dist ./dist

# Copy server-specific files
COPY --from=builder /app/server/server.js .
COPY --from=builder /app/server/package.json .
COPY --from=builder /app/server/package-lock.json .


# Install only the server's production dependencies
RUN npm install --omit=dev

EXPOSE 8080

# The "start" script in your package.json will run the server
CMD [ "npm", "start" ]
