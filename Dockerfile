# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript (if using TypeScript)
RUN npm run build

RUN npm test
# Expose the port the app runs on
EXPOSE 3000

# Define the command to start the app
CMD ["npm","run", "dev"]
