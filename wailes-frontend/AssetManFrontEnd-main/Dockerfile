# pull official base image
FROM node:18-alpine

#set working directory
WORKDIR /app

#add '/app/node_modules/.bin' to $PATH
ENV PATH /app/node_modules/.bin:$PATH

#install app dependencies
COPY package.json ./


RUN npm install --silent --force
RUN npm install react-scripts@5.0.1 -g --silent

# add app
COPY / ./

# start app
CMD ["npm", "start"]