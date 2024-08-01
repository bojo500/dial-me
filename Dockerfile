# Use official Node.js image
FROM node:18

# Create and change to the app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Expose the port the app runs on
EXPOSE 9000

# Run the app
CMD [ "npm", "run", "start:prod" ]
