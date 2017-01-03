FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/Atlas-Service-Template
WORKDIR /usr/src/Atlas-Service-Template

# Install app dependencies
COPY package.json /usr/src/Atlas-Service-Template/
RUN npm install

# Bundle app source
COPY . /usr/src/Atlas-Service-Template

EXPOSE 8080
CMD [ "npm", "start" ]
