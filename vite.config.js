import { defineConfig } from "vite";
import path from "node:path";
import * as glob from "glob";
import { fileURLToPath } from "url";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import HtmlCssPurgePlugin from "vite-plugin-purgecss";
import HandlebarsPlugin from "vite-plugin-handlebars";
import { getData } from "./src/data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { resolve } = path;

function obtenerEntradas() {
  const files = glob.sync("./*.html");
  return Object.fromEntries(
    files.map((file) => [
      file.slice(0, file.length - path.extname(file).length),
      resolve(__dirname, file), 
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
      partialDirectory: resolve(__dirname, "src", "partials"), 
      context: (pagePath) => getData(pagePath),
    }),
    HtmlCssPurgePlugin(),
    ViteMinifyPlugin(),
  ],
});
