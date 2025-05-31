# 1) Use the official Node.js 18 Alpine image as the base
FROM node:18-alpine

# 2) Set the working directory inside the container
WORKDIR /app

# 3) Copy only package.json and package-lock.json to leverage Docker cache on npm install
COPY package*.json ./

# 4) Install all dependencies (including devDependencies for Vite)
RUN npm install

# 5) Copy the rest of the frontend source files (src/, public/, vite.config.ts, etc.)
COPY . .

# 6) Start the Vite dev server (assumes "dev": "vite --host 0.0.0.0 --port 3000" in client/package.json)
CMD ["npm", "run", "dev"]

# 7) Expose port 3000 so docker-compose can map it to host
EXPOSE 3000
