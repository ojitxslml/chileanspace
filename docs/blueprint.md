# **App Name**: CHILEANSPACE: A healthful habitat in Mars

## Core Features:

- 3D Habitat Explorer: Interactive 3D model of the Mars habitat with orbital controls, zoom, and auto-frame functionality using Three.js. Includes toggleable dome, greenhouses, solar panels and piezzoelectric layers.
- Storm Intensity Simulation: Slider to simulate dust storm intensity, affecting particle density and piezoelectric layer emission, with real-time energy output (kWe) displayed.
- Interior Designer: Drag-and-drop interface for designing interior layouts on different habitat levels, with volume and area calculations. Persisted with local storage.
- Apply Interior Design to 3D: Transfers the designed interior layout as placeholders on the 3D Model to reflect volume and dimensions accurately. Can apply to GLB model if provided
- Sectional Analysis: Toggleable cross-section view of the 3D model with key dimensions and an interactive table for area breakdowns. Supports export to JSON/CSV.
- Material Viewer: A catalogue of construction materials with tooltips and a toggle to display them on the 3D model.
- Habitability Dashboard: Dashboard for displaying habitability KPIs like ECLSS redundancy, energy requirements, and a simple fault simulator.

## Style Guidelines:

- Primary color: Rusty orange (#C4560E), evocative of Martian landscapes.
- Background color: Desaturated orange (#F2E7D3), providing a warm, muted backdrop.
- Accent color: A light-orange/yellow (#F4BB4A) to highlight interactive elements.
- Font pairing: 'Space Grotesk' (sans-serif) for headers and 'Inter' (sans-serif) for body text.
- Technical icons with a clean, modern style, for tabs and interactive elements.
- Fixed left sidebar for navigation, header with the application title, and responsive design for various screen sizes.
- Subtle animations for dust particle effects and piezoelectric layer flicker.