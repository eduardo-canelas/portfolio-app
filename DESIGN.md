# Design

## Color

Use tinted charcoal and graphite surfaces with one restrained chartreuse accent. Avoid pure black, pure white, purple-blue gradients, and neon glows.

## Typography

Use Archivo for body and display type with strong weight contrast. Use system monospace only for compact repository metadata and code-like labels.

## Layout

Favor asymmetric brand composition: a photo-led left rail, large proof-led hero copy, and a right-side interactive project console. On mobile, collapse aggressively to one column with stable spacing and no horizontal overflow.

## Components

- Photo mark in the header, never a placeholder initial block.
- Featured project inspector for the strongest repos.
- Repository strip for smaller public repos that still show breadth.
- Timeline and stack sections with dividers and spatial grouping instead of repeated identical cards.

## Motion

Use GSAP through `useGSAP` with a scoped root. Animate transforms and opacity only. Respect `prefers-reduced-motion`. Keep perpetual motion limited to subtle map lines, project cursor movement, and small photo/status motion.
