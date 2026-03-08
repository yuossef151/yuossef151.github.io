<<<<<<< HEAD
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  import tailwindcss from "@tailwindcss/vite";

  // https://vite.dev/config/
  export default defineConfig({
    base: "/",
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    plugins: [react(), tailwindcss()],
  });
=======
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  import tailwindcss from "@tailwindcss/vite";

  // https://vite.dev/config/
  export default defineConfig({
    // base: "/",
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    plugins: [react(), tailwindcss()],
  });
>>>>>>> 0b09a978babdc32cbcebdbde84e281f8c3a073f2
