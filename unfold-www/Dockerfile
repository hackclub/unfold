# SvelteKit (@sveltejs/adapter-node) app, built and run with Bun.
FROM oven/bun:1 AS build
WORKDIR /app

# install deps against the committed lockfile
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# build the adapter-node server into ./build
COPY . .
RUN bun run build

FROM oven/bun:1-slim AS run
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# adapter-node output needs build/, package.json, and node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

EXPOSE 3000
CMD ["bun", "./build/index.js"]
