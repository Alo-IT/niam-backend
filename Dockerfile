# Use a Node.js image as the base
FROM node:18.12.0

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the server files to the container
COPY . .

# Set the command to start the server application
CMD ["npm", "run", "start"]
