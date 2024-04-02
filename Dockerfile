FROM arm64v8/httpd:2.4.57

# Set a working directory inside the container
WORKDIR /usr/local/apache2/htdocs/

# Copy the content from your host machine to the container's working directory
COPY . .

# Expose port 80 for HTTP traffic (optional, but useful for documentation)
EXPOSE 80
