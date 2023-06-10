###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:gallium-alpine As development

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:gallium-alpine As build

WORKDIR /app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm install -g nest

RUN npm run build

RUN npm install --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:gallium-alpine As production

COPY --chown=node:node --from=build /app/package.json ./package.json
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

CMD [ "npm", "run", "start:prod" ]
