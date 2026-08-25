# 🧙 Personal Portfolio

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

> 🌍 **Live Site:** [lorenzo-feltrin.vercel.app](https://lorenzo-feltrin.vercel.app)

A personal portfolio built to gain visibility in the market while breaking away from generic templates. Inspired by the magic system of the anime *Witch Hat Atelier*—where magic is cast by drawing and perfectly completing circles—I decided to bring this mechanic directly into the UI.

> 🎨 **Design Engineering: Escaping Figma**
> 
> This was the only recent project I built entirely without opening Figma. I realized immediately that the "physics" of the site—the scroll momentum, the floating cards, the rotation of the menu—were just as important as the static visual design. A static prototype wouldn't capture the essence, so I went straight to the code.

---

## 🌟 Key Features & Technologies

This project served as the perfect playground to step out of my comfort zone and dive headfirst into **React** and **Tailwind CSS**, focusing heavily on mathematical logic for the UI.

### 🧭 Interactive Circular Navbar (@dnd-kit & React)
The heart of this project is a circular Navbar where the user must drag a "rune" and complete the magic circle to navigate between pages. 
*   **State Management:** React handles the complex state needed to track drag gestures, calculate angles in real-time, and synchronize with `react-router-dom` to trigger transitions.
*   **Drag & Drop:** `@dnd-kit/core` was used as the foundational event listener, completely hijacked to work in a circular orbit rather than a standard linear list.

### 📐 The Mathematics Behind the UI (Vanilla JavaScript)
To make the drag-and-drop feel natural and fluid on a circular axis, standard CSS wasn't enough. The interactions run on pure Math:
*   **Trigonometry (Polar to Cartesian):** Used `Math.sin()` and `Math.cos()` to convert angles and radius lengths into exact `X` and `Y` pixel coordinates, perfectly placing menu items in an invisible orbit.
*   **Pythagorean Theorem (Snap Mechanics):** Used `Math.hypot(dx, dy)` to calculate the Euclidean distance between the cursor and the center of the magic circle, triggering a magnetic "snap" effect when close enough.
*   **Arc-Tangent (Dynamic Rotation):** Applied `Math.atan2()` to calculate the exact angle of the drag gesture in radians, tracking the mouse and spinning the entire SVG ring in real-time.

### 🎭 Fluid Physics & Layout (Framer Motion & Tailwind)
*   **Framer Motion:** Handles the spring animations, the floating "Grimoire" project cards, and seamless page-load transitions, giving the site its "weight" and physics.
*   **Tailwind CSS:** Enabled rapid UI development. I avoided generic color generators and extracted a custom palette from *"A Dictionary Of Color Combinations Vol. 1"* by Japanese artist Sanzo Wada:
    *   ☀️ **Light Mode:** Parchment Base (`#D0C697`) with Dark Wine accents (`#4F2B33`).
    *   🌙 **Dark Mode:** Dark Sepia Base (`#3B381E`) with Mystic Green accents (`#91B09A`).

---

## 🎥 Application Demo

Watch the video below to see the physics-based circular navigation and the UI interactions in action.



https://github.com/user-attachments/assets/05148ae3-4b25-4830-8769-680dccd079de

