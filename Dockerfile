# ----------------- Build Stage -------------------------- #
FROM oven/bun:latest AS build
WORKDIR /app

# install the dependecies
COPY  ./package.json bun.lock  ./
RUN  bun install --frozen-lockfile

#copy the files into the ./app
COPY . .
RUN bun run build 

# ----------------- Running Stage ------------------- #

FROM oven/bun:latest
WORKDIR /app

RUN useradd -m app

RUN mkdir -p /app/logs && chown -R app:app /app

COPY --from=build /app/dist ./dist

EXPOSE 3000

USER app

CMD ["bun", "dist/index.js"]