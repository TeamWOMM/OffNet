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

# Install Chromium dependencies for Puppeteer
RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk1.0-0 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm-dev \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libxrender1 \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Expose port if needed (not necessary since this is a scraper)
EXPOSE 5000

# Run Puppeteer script
CMD ["node", "index.js"]
