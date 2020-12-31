FROM node:12.16.3

RUN mkdir -p /usr/src/auth-api
WORKDIR /usr/src/auth-api
COPY package*.json /usr/src/auth-api/
RUN npm install
COPY . /usr/src/auth-api/
EXPOSE 3031

CMD ["npm", "start"]
