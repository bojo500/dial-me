# Base image
FROM node:18

# Create and set working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Rebuild bcrypt
RUN npm rebuild bcrypt --build-from-source

# Copy app source code
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start:prod"]
