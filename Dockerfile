FROM node:16

# Install DEB dependencies and others.
RUN \
    set -x \
    && apt-get update \
    && apt-get install -y net-tools build-essential python3 python3-pip valgrind

ADD package.json .

ADD package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]