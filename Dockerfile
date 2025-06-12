FROM node:18-alpine as buildstage
COPY . .
ARG ENV
ARG GIT_TOKEN
ENV GIT_TOKEN=${GIT_TOKEN}
ENV NODE_ENV=${ENV}
RUN npm install webpack webpack-node-externals tsconfig-paths-webpack-plugin --save-dev \
    && npm install typescript -g \
    && tsc
CMD npm run build:${ENV}   
    
FROM node:18-alpine 
RUN addgroup -g 10002 -S incred && adduser -u 10001 -S incred -G incred
WORKDIR app/
COPY --chown=incred:incred --from=buildstage dist dist
# TODO - Remove config in below step once mounted as k8s cm
COPY --chown=incred:incred package.json .npmrc config ./
ARG ENV
ARG GIT_TOKEN
ENV GIT_TOKEN=${GIT_TOKEN}
ENV NODE_ENV=${ENV}
RUN npm install
USER incred
CMD [ "npm", "start" ]
