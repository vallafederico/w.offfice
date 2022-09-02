import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import glsl from "vite-plugin-glsl";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), tailwind()],
  vite: {
    plugins: [glsl()],
  },
});
