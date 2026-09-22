# TRIO Cinematic Showcase

Build this as a real, production-ready website, not a static mockup.

Use React + TypeScript + Tailwind CSS and the existing Lovable/Vite project architecture unless there is a compelling technical reason not to.

Prioritize visual quality, cinematic composition, responsive behavior, and maintainability over implementing every decorative effect immediately.

Do not simplify the creative direction into a generic landing-page template.

For the initial build, focus first on:

 Navigation

 Intro sequence

 Hero

 Story

 World of TRIO

 The Three

 Behind TRIO

 Vision

 Trailer

 Credits/footer

Create the complete page structure and establish the final design system before adding expensive secondary effects.

Use tasteful placeholder blocks/images where official assets are missing. Do not invent fake TRIO artwork, cast photography, production stills, quotes, awards, reviews, statistics, release dates, or story information.

EDITABILITY IS A CORE REQUIREMENT

Centralize all frequently changed TRIO content in a clearly organized data/config structure. This should include:

 film title

 tagline

 synopsis

 release status/date

 teaser/trailer URL

 hero media

 posters

 character images

 BTS images

 cast

 crew

 credits

 social links

 CTA labels

 section copy

Do not scatter this content throughout components.

Build reusable components so I can later say things such as “replace the hero video,” “add five BTS photos,” “change Coming Soon to Watch Now,” or “update the trailer URL” without requiring a redesign.

IMPORTANT

Do not attempt to redesign, shorten, reinterpret, or genericize the following creative specification. Treat it as the source of truth for TRIO's website identity.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://trio-thechristianfilm.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bee6cd8c-258d-40f9-8616-d0b5ceb1a262).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
