FROM alpine:latest

# set node_env to production
ENV NODE_ENV=production

# install node
RUN apk add nodejs npm

# create mountpoint for data
RUN mkdir -p /data
VOLUME ["/data"]

# copy project files
RUN mkdir -p /opt/matrix-room-deprecation-bot
WORKDIR /opt/matrix-room-deprecation-bot
COPY build/ ./

# install production dependencies
RUN npm ci --only=production

CMD ["node", "index.js"]
