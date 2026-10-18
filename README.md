# Pokémon & ROM Hacks Portfolio | Mission 1 and 2

A responsive one-page website built to showcase fundamental HTML, CSS, and Javascript skills for Missions 1 and 2

The site has a custom Pokémon aesthetic complete with hover-reveal sprite animations, interactive type/ability tooltips, custom cursors, and a fully functional email contact form.

![alt text](image.png)

---

## Live Demo

To run this demo, install Live Server in VS Code. Click Go Live in the bottom right corner of VS Code and open port: 5500.
Install Live Sass Compiler in VS Code. Click Watch Sass at the bottom to enable CSS features.

---

## Features & Highlights
* **Interactive Pokémon Cards:** Static sprite images dynamically swap to animated GIFs on hover, accompanied by sliding tooltip cards detailing types and abilities.
* **Authentic Pokémon Cries:** Clicking any Pokémon card dynamically fetches and plays their official audio cry using the PokéAPI.
* **Shiny Mode Toggle:** Features a custom sliding Pokéball switch that transforms the page theme and swaps all sprites over to their rare Shiny variants.
* **Custom Theme & Typography:** Implements a custom `@font-face` Pokémon font, dark gradient styling, and custom Cubone cursors for anchors and buttons.
* **Responsive Layouts:** Built utilizing modern CSS Grid for card alignment and Flexbox for component and navigation spacing.
* **Running Animation:** Features a continuous keyframe animation of a running Pikachu across the header track.
* **Contact Form:** Integrated via Formspree for handling inquiries directly, complete with custom autofill styling overrides.

---

## Tech Stack
* **HTML5:** Semantic structural elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<form>`,`<head>`, `<body>`, `<div>`, `<h1>`, `<p>`, `<img>`, `<a>`, `Class` and `ID` attributes).
* **CSS3:** Custom properties, Flexbox, CSS Grid, Media Queries, and Keyframe Animations, background and font stylisation, margins, width & height properties, animations, Sass.
* **JavaScript (ES6+):** Handles dynamic API data fetching for audio cries, DOM manipulation for image swapping, and event listeners for the Shiny mode toggle.

---

## Project Structure
```text
├── index.html       # Main HTML structure
├── main.scss        # Source Sass stylesheet (modular variables, nesting, features)
├── main.css         # Compiled CSS stylesheet read by the browser
├── main.css.map     # Source map linking SCSS to CSS
├── main.js          # JavaScript logic (audio cries & shiny mode toggles)
└── images/          # Sprites, shiny variants, logos, banners, and cursors