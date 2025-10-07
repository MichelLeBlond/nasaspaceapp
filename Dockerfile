# Stage 2: Production server
FROM node:20-alpine

ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /app/server

# Copy server-specific package files first for better caching
COPY --from=builder /app/server/package.json .
COPY --from=builder /app/server/package-lock.json .

# Install only the server's production dependencies
# This layer will be cached if package.json/package-lock.json don't change
RUN npm install --omit=dev

# Copy server's main application file
COPY --from=builder /app/server/server.js .

# Copy frontend build assets.
# Ensure your server.js knows to serve these from './dist' relative to /app/server
COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD [ "npm", "start" ]
