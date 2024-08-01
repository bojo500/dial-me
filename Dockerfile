# Use the official Node.js image.
FROM node:18

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy the application code.
COPY . .

# Build the application.
RUN npm run build

# Start the application.
CMD ["npm", "run", "start:prod"]
