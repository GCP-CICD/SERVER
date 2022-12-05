
# Set the base image (去dockerHub找輕量的)
FROM node:lts-alpine3.15

# Specify where our app will live in the container
WORKDIR /app

# Copy the React App to the container
COPY . /app/

# Install dep
RUN npm install

# express監聽3000  容器就要對外暴露
EXPOSE 3000


# Start App
CMD ["npm", "run", "start"]