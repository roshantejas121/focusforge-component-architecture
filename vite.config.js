import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/focusforge-component-architecture/",
  plugins: [react()],
});
