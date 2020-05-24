FROM node:12.16
WORKDIR /app
COPY . .
ENV PORT=4000
RUN npm install
EXPOSE $PORT
ENTRYPOINT [ "npm", "test" ]



