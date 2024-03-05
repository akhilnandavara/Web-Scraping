FROM ghcr.io/puppeteer/puppeteer:21.5.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

# Copy package.json and package-lock.json files and install dependencies
COPY package*.json ./
RUN npm ci

# Run Puppeteer's install script to set up the correct version
RUN node node_modules/puppeteer/install.js 

# Copy the rest of the application files
COPY . .

# Command to run the application
CMD [ "node", "index.js" ]
