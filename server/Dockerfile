# 1) Use an official Node.js 18 Alpine image as the base
FROM node:18-alpine

# 2) Set the working directory inside the container
WORKDIR /app

# 3) Copy only package.json and package-lock.json to leverage Docker layer caching
COPY package*.json ./

# 4) Install all dependencies (including devDependencies for TypeScript)
RUN npm install

# 5) Copy the rest of the backend source code into the container
COPY . .

# 6) Run the development script (assumes you have "dev": "ts-node-dev --respawn --transpile-only src/index.ts" in server/package.json)
CMD ["npm", "run", "dev"]

# 7) Expose port 4000 so that host → container mapping works in docker-compose
EXPOSE 4000
