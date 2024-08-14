FROM node:18.17.1-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18.17.1-alpine AS runner
# Set the working directory inside the container
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/build ./build

# Install a simple HTTP server for serving static files
RUN npm install -g serve

# Set the default command to serve the built files
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose the desired port (3000)
EXPOSE 3000
