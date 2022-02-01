# FROM node:lts-alpine
FROM node:17.4-stretch
# ENV NODE_ENV=production
WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "./"]
COPY package*json ./
# RUN npm install --production --silent && mv node_modules ../
RUN npm install &&  mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
# RUN node ./dev-data/data/import-dev-data.js --import
CMD ["npm", "start"]

# /usr/src/app -> FILES -> ownership
# /usr/src/app -> FILES + node_modules -> ownership