
FROM node:8.15-stretch AS builder
LABEL maintainer="datapunt@amsterdam.nl"

ARG BUILD_ENV=prod
ARG BUILD_NUMBER=0
WORKDIR /app

# Run updates and cleanup
RUN apt-get update
RUN apt-get install -y \
      netcat \
      git
RUN rm -rf /var/lib/apt/lists/*

# Copy sources
# COPY . /app/

COPY src /app/src
COPY public /app/public
COPY internals /app/internals
COPY server /app/server
# COPY test /app/test
COPY package.json \
     package-lock.json \
     .gitignore \
     .gitattributes \
      /app/

COPY environment.conf.${BUILD_ENV}.json /app/environment.conf.json

#  Changing git URL because network is blocking git protocol...
RUN git config --global url."https://".insteadOf git://
RUN git config --global url."https://github.com/".insteadOf git@github.com:


# Install NPM dependencies. Also:
RUN npm --production=false \
        --unsafe-perm \
        --verbose \
       install
RUN npm cache clean --force

# Build
RUN echo "run build"
# RUN npm rebuild node-sass
RUN npm run build

# Test


# Deploy
FROM nginx:stable-alpine
COPY --from=builder /app/build/. /usr/share/nginx/html/

COPY default.conf /etc/nginx/conf.d/

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log
