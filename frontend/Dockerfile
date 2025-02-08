# === Stage 1: Build Stage ===
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage Docker caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# === Stage 2: Production Stage ===
FROM node:18 AS runner

# Set working directory
WORKDIR /app

# Copy only the built output from the previous stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Expose port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]