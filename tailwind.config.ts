import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"

const config: Config = {
darkMode: ["class"],
content: [
"./pages//*.{ts,tsx}",
"./components//.{ts,tsx}",
"./app/**/.{ts,tsx}",
"./src/**/*.{ts,tsx}"
],
theme: {
container: {
center: true,
padding: "2rem",
screens: {
"2xl": "1400px"
}
},
extend: {
fontFamily: {
playfair: ["Playfair Display", "serif"],
inter: ["Inter", "sans-serif"]
},
colors: {
neonblue: "#32e2ec",
neonpink: "#ec32c7",
neonviolet: "#8f32ec",
neongreen: "#3fec71"
},
backgroundImage: {
"gradient-radial": "radial-gradient(var(--tw-gradient-stops))"
},
animation: {
"fade-in": "fade-in 0.5s ease-out",
"pulse-neon": "pulse 1.5s infinite alternate"
},
keyframes: {
"fade-in": {
"0%": {
opacity: "0",
transform: "translateY(24px)"
},
"100%": {
opacity: "1",
transform: "translateY(0)"
}
},
pulse: {
"0%": {
filter: "drop-shadow(0 0 0 #32e2ec)"
},
"100%": {
filter: "drop-shadow(0 0 18px #ec32c7)"
}
}
}
}
},
plugins: [animate]
}