FROM node:10

# Create app directory
WORKDIR hyperswarm-gateway

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3282/tcp 3282/udp
CMD [ "npm", "start"]
