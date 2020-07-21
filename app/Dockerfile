#FROM mhart/alpine-node:11 AS builder
#WORKDIR /app
#COPY . .
#RUN npm install react-scripts -g --silent
#RUN yarn install
#RUN yarn run build
#
#FROM mhart/alpine-node
#RUN yarn global add serve
#WORKDIR /app
#COPY --from=builder /app/build .
#CMD ["serve", "-p", "80", "-s", "."]doc

# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

RUN ls

# start app
CMD ["npm", "start"]