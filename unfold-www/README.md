# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
bun x sv@0.16.1 create --template minimal --types ts --add tailwindcss="plugins:none" sveltekit-adapter="adapter:node" --install bun unfold-www
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
bun run build
```

This outputs a self-contained Node server to `build/`. Start it with:

```sh
bun run start   # or: node build
```
The server respects `PORT` and `ORIGIN` environment variables. In production,
inject the secrets listed in `.env.example` as environment variables.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
