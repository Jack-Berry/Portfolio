# Jack Berry - Portfolio

Personal portfolio site built with React and Vite. Live at [berrydev.co.uk](https://berrydev.co.uk).

## Tech stack

- React 18 with React Router v6
- Vite 4
- SCSS for all styling
- EmailJS for the contact form
- Deployed on Vercel

## Pages

**About** - Intro section with a choice of three animated backgrounds (spinning rings, tech rain canvas, random dots canvas). The "I like using" text cycles through tech tools on hover and locks in on "Tech" after the initial animation.

**Portfolio** - Three in-depth case studies (Holiday Homes & Lets, Useless Men's Co-operative, Holidough) followed by a card carousel of smaller projects with an expandable features panel on each card.

**Contact** - Simple contact form that sends via EmailJS.

## Running locally

```bash
npm install
npm run dev
```

Requires Node 20.x.

## Project structure

```
src/
  assets/          project images and icons
  components/      React components
  css/             SCSS files, one per component plus _variables and index
  data/            project and case study content (caseStudies.js, projects.js)
```

## Notes

The contact form requires an EmailJS account and service ID to work. Without valid credentials the form will fail silently on send.

Dark and light mode preference is stored in localStorage and defaults to dark.
