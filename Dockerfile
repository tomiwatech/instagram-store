FROM node:carbon

# Create app directory
RUN mkdir -p /usr/src/nodejs-template
WORKDIR /usr/src/nodejs-template

# Install app dependencies
COPY package.json /usr/src/nodejs-template/
RUN npm install

# Bundle app source
COPY . /usr/src/nodejs-template

EXPOSE 8080
CMD [ "npm", "start" ]
