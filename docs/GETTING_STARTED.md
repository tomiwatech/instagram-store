## Getting started

Make sure you have at least Node.js 6.9.1 (7.3.0 recommended) installed.

You can check your Node.js version by running node -v:

``` console
$ node -v
v7.3.0
```

#### `clone`

Navigate to your work directory and clone the project into <project-name> folder, change directory to the `new folder` and add a new remote origin pointing to the new project repo.

``` console
$ git clone https://github.com/AtlasCardDev/nodejs-template.git <project-name>
$ cd <project-name>
~/project-name $ git remote add origin https://github.com/AtlasCardDev/<project-name>.git
```

#### `gulp`

Install [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started) and navigate to new project directory, then run `sudo npm install` to install Node packages.

``` console
$ sudo npm install -g gulp
~/project-name $ sudo npm install
```

Run `gulp` to start project server:

``` console
~/project-name $ gulp serve
```

(Or, `gulp help` to see more task options)

``` console
~/project-name $ gulp help

  Main Tasks
  ----------------------
      babel
      clean
      copy
      default
      help
      nodemon
      serve
      test
```

#### `docker`

Install [Docker](https://www.docker.com/products/docker#/mac) and configure Dockerfile in the project.

**Dockerfile**

You could reconfigure the  `Dockerfile` if need be. But the base configuration has been added and should work fine when building your image.

The following example shows a Dockerfile

```
FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 80
CMD [ "npm", "start" ]
```

**.dockerignore**

A `dockerignore` file should be in the same directory as your `Dockerfile`, as it prevents files or folders from being copied onto your Docker image.

**Building your image**

Change directory to where your `Dockerfile` exists and run the following command. The `-t` flag lets you tag your image.

``` console
$ docker build -t <your username>/node-js-template .
```

Run `docker images ` to show your built image:

``` console
$ docker images

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
nginx               latest              01f818af747d        6 days ago          181.6 MB
node                 boron              539c0211cd76        3 weeks ago        80.0 MB
<your username>/node-js-template         latest              c54a2cc56cbb        6 months ago        1.848 kB
```

**Run your image**

Run the image with `-d` in detached mode, leaving the container running in the background. The `-p` flag redirects a public port to a private port inside the container.

``` console
$ docker run -p 80:80 -d <your username>/node-js-template
```

Run `docker ps` to get container information:

``` console
CONTAINER ID        IMAGE                                CREATED             STATUS              PORTS 
6a0f008a639c        <your username>/node-js-template     9 minutes ago       Up 2 minutes        0.0.0.0:80->80/tcp, 443/tcp  
```

Docker is now mapped to `localhost:80` inside of the container to port 80 on your machine.

Using `curl` 

``` console
$ curl -i -X GET localhost/api                                                                                                           

HTTP/1.1 200 OK
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, PATCH, DELETE
Access-Control-Allow-Headers: Authorization, Origin, Content-Type, Accept
Access-Control-Allow-Credentials: true
Content-Type: application/json; charset=utf-8
Content-Length: 25
ETag: W/"19-6jwj4rMp1F49cKKCNHygJQ"
Date: Wed, 04 Jan 2017 10:09:53 GMT
Connection: keep-alive

{ "message":"Get Service" }
```

visit [Docker webapp docs](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/) for further assistance.