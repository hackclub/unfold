# unfold ꕥ

hi! this is the website for unfold, a 6 week hack club YSWS for teenagers to ship their ambitious ideas. the website holds docs & info for unfold participants, as well as "unfold os", a sort of home base for unfolders that points to event links and other resources.

it was built with SvelteKit, and previously deployed on Cloudflare Workers. now it's on Orchard using SvelteKit's Node adapter and a Dockerfile.

only the doc for the current week is acessible by clicking around - so that people don't get confused - but you can always use direct links to the [previous](https://unfold.hackclub.com/docs/week-1) [weeks](https://unfold.hackclub.com/docs/week-2).

![image](https://cdn.hackclub.com/019fb4fd-d551-7653-9c0d-8449afeb17c7/image.png)
![image](https://cdn.hackclub.com/019fb4fd-d8b7-7b3e-bbf4-8be7c5ac1c4f/image.png)

## how to deploy

make sure to set up your .env first! rename unfold-www/.env.example to .env, then fill it out. you'll need to create a hack club auth app + have an airtable base ready for RSVPs. you'll also need to create a slack bot to add people to channels. there are tutorials out there that can teach this much better than i can, but you'll need the `channels:manage`, `groups:read`, `groups:write`, and `users:read` scopes.

easiest path, if you're deploying to somewhere that likes docker:
```
git clone https://github.com/hackclub/unfold/
cd unfold/unfold-www
docker build -t unfold-www .
docker run -p 3000:3000 --env-file .env unfold-www
```

or without docker:
```
bun install --frozen-lockfile
bun run build # goes to /build
ORIGIN=https://yourdomain bun run start
```

## ai disclosure

not gonna lie, in the interest of getting this out quickly, i (neven), used ai quite heavily here. a coding agent walked me through setting up HCA and hooking everything up to Resend and Airtable, and i used agents to speed up transfering some posts from a slack canvas to pages on the site. a lot of the timezone stuff on unfold os was also vibeslopped, though i still understand the code and can make changes to it myself.
