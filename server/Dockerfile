FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm install -g typescript
RUN tsc || true

EXPOSE 3000

CMD ["node",  "dist/server.js"]

# docker build . --tag nodets
# docker run --rm --name first-container -p 3000:3000 nodets
# CMD ["npm", "run", "dev"]