# Stage 1: Install dependencies
FROM node:22-alpine3.20 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Stage 2: Build and run the app
FROM node:22-alpine3.20 AS runner
WORKDIR /app

# Environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose the app port
EXPOSE 5000

# Healthcheck using your /health endpoint
HEALTHCHECK CMD node -e "require('http').get('http://localhost:'+(process.env.PORT||5000)+'/health',r=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))"

# Security: run as non-root user
RUN addgroup -S nodegrp && adduser -S nodeuser -G nodegrp
USER nodeuser

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Start the app (PulseVote uses server.js as entry point)
CMD ["node", "server.js"]
