# Use official Node.js image with Chromium support
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files first (to optimize Docker caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port if needed (not necessary since this is a scraper)
EXPOSE 5000

# Run Puppeteer script
CMD ["node", "index.js"]