FROM node:22-alpine

RUN apk add --no-cache su-exec

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["dev"]
