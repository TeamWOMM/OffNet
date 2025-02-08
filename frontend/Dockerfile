# === Stage 1: Build Stage ===
FROM node:18 AS builder

WORKDIR /app

# Copy package files first (to leverage Docker caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# **Ensure Next.js build completes successfully**
RUN npm run build

# === Stage 2: Production Stage ===
FROM node:18 AS runner

WORKDIR /app

# Copy only the built output from the previous stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# **Ensure the .next folder is available before starting**
RUN ls -la .next || echo "❌ ERROR: .next build folder missing"


# Expose port
EXPOSE 4000

# Start the Next.js application
CMD ["npm", "run", "dev"]
