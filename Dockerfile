# Stage 1: Build the React application
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the static files
RUN npm run build

# Stage 2: Create the final, smaller image
FROM node:20-alpine

# Set production environment
ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

WORKDIR /home/appuser/app

# Copy built assets and install 'serve' to run the static server
COPY --from=builder /usr/src/app/dist ./
RUN npm install -g serve

EXPOSE 8080
CMD ["serve", "-s", ".", "-l", "8080"]