#working base image and directory
FROM oven/bun:latest
WORKDIR /app

# install the dependecies
COPY  ./package.*  ./
RUN  bun install

#copy the files into the ./app
COPY . .
RUN bun run build 
EXPOSE 3000

#set up a user
RUN adduser app
USER app

# the start image command
CMD  [ "bun", "run", "start" ]