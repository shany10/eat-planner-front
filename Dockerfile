FROM node:20-alpine

ARG UID=1000
ARG GID=1000

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Utiliser UID/GID numériques pour éviter les conflits de user/group dans l'image de base.
RUN mkdir -p /app/node_modules && \
    chown -R ${UID}:${GID} /app

USER ${UID}:${GID}

EXPOSE 3001

CMD ["npm", "run", "dev"]
