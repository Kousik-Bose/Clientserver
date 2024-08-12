# Use the official Node.js image as the base image
FROM node:18

# Update package lists and install nano
RUN apt-get update && apt-get install -y nano

# Create and set the working directory inside the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .


# Command to run the client code
CMD ["node", "client.js"]
