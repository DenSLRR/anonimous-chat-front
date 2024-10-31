import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { resolve } from "path";

// https://vitejs.dev/config/
export default ({ mode }: { mode: any }) => {
  const envDir = resolve(__dirname, "./");

  const env = loadEnv(mode, envDir, "");

  const chunkName = "[hash]";

  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: `js/${chunkName}-c.js`,
          entryFileNames: `js/${chunkName}-e.js`,
          assetFileNames: ({ name }) => {
            if (/\.css$/.test(name ?? "")) {
              return `css/${chunkName}[extname]`;
            }
            if (/\.(png|jpe?g|gif|webp|ico)$/.test(name ?? "")) {
              return `assets/img/${chunkName}[extname]`;
            }
            if (/\.(woff|woff2|eot|ttf|otf)$/.test(name ?? "")) {
              return `assets/fonts/${chunkName}[extname]`;
            }
            if (/\.(webm|mp4|ogv|mov)$/.test(name ?? "")) {
              return `assets/video/${chunkName}[extname]`;
            }
            if (/\.mp3$|\.wav$/.test(name ?? "")) {
              return `assets/audio/${chunkName}[extname]`;
            }
            return `assets/${chunkName}[extname]`;
          },
        },
      },
    },
    preview: {
      port: +env.FRONT_PORT || 5173,
    },
    define: {
      __APP_ENV__: JSON.stringify(env),
    },
  });
};
