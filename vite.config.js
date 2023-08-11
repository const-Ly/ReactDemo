// import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react";

import { fileURLToPath, URL } from "node:url";
import path from "path";
import postcssPxtorem from 'postcss-pxtorem'


import { defineConfig } from "vite";
import { viteVConsole } from "vite-plugin-vconsole";

process.env.VITE_APP_VERSION = require("./package.json").version;

const viteConfig = defineConfig(({ mode }) => {
  console.log('sss', mode)
  return {
    plugins: [
      react(),
      // {
      //   ...postcssConfig,
      //   apply: "build",
      // },
      viteVConsole({
        entry: path.resolve("src/main.jsx"), // 入口文件，或者可以使用这个配置: [path.resolve('src/main.js')]
        localEnabled: mode === "dev", // 本地是否启用
        enabled: mode === "dev", // 是否启用
        config: {
          maxLogNumber: 1000,
          theme: "light", // 主题颜色 'dark'|'light'
        },
      }),
      // visualizer({
      //   gzipSize: true,
      //   brotliSize: true,
      //   emitFile: false,
      //   filename: 'test.html', //分析图生成的文件名
      //   open: true, //如果存在本地服务端口，将在打包后自动展示
      // }),
    ],
    // base:
    //   env.VITE_APP_MODE === 'development'
    //     ? '/'
    //     : `https://img.cacheserv.com/website/${env.VITE_APP_PUBLIC_PATH}/`,
    server: {
      port: 9001,
      proxy: {
        "/api": {
          target: "https://aigc.huajiao.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: mode == "production", // env.VITE_APP_MODE === 'production',
          drop_debugger: mode == "production",
        },
      },
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        less: {
          charset: false,
        },
      },
      postcss: {
        plugins: [
          postcssPxtorem({
            rootValue: 37.5, // 1rem的大小
            propList: ['*'] //需要转换的属性
          })
        ],
      },
    },
  };
});

export default viteConfig;
