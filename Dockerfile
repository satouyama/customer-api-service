RUN mkdir -p /usr/app/current

WORKDIR /usr/app/current

COPY package.json .

RUN npm config set unsafe-perm true
 
RUN npm i -g nodemon --silent
RUN npm i -g jest --silent
RUN npm i --silent

COPY . .

USER app

EXPOSE 8080