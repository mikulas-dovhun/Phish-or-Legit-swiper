# Change from 18-alpine to 20-alpine
FROM node:20-alpine as build-stage

WORKDIR /app

# Copy package files first
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Now this command will work because Node 20 is present
RUN npm run build

# Production stage: Serve with Nginx
FROM nginx:stable-alpine
# Note: Vite builds to 'dist' by default.
# If you are using Create React App, change 'dist' to 'build'
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]