import { defineConfig } from "vite";
import path from "node:path";
import * as glob from "glob";

import { ViteMinifyPlugin } from "vite-plugin-minify";
import HtmlCssPurgePlugin from "vite-plugin-purgecss";
import HandlebarsPlugin from "vite-plugin-handlebars";
import { getData } from "./src/data";

const { resolve } = path;

function obtenerEntradas() {
  const files = glob.sync("./*.html"); 
  return Object.fromEntries(
    files.map((file) => [
      file.slice(0, file.length - path.extname(file).length),
      resolve(dirname, file),
    ])
  );
}

export default defineConfig({
  appType: "mpa",
  base: "/Portafolio/", 
  build: {
    outDir: "dist",
    minify: true,
    rollupOptions: {
      input: obtenerEntradas(),
    },
  },
  plugins: [
    HandlebarsPlugin({
      partialDirectory: resolve(dirname, "src", "partials"),
      context: (pagePath) => getData(pagePath),
    }),
    HtmlCssPurgePlugin(),
    ViteMinifyPlugin(),
  ],
});