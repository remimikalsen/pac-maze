# Stage 1: Build the SvelteKit app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the SvelteKit app
RUN npm run build

# Stage 2: Serve the app using a lightweight web server
FROM nginx:alpine AS serve

# Copy the built app from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy a custom Nginx configuration (optional)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
