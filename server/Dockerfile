FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy the rest of the application code to the working directory
COPY . ./

ENV NODE_ENV=development
ENV PORT=3000

# Install TypeScript globally
RUN npm install -g typescript

# Compile TypeScript to JavaScript
RUN tsc

# Expose the application port (adjust based on your app configuration)
EXPOSE 3000

# Specify the command to run your application
CMD ["node",  "dist/server.js"]

# CMD ["npm", "run", "dev"]