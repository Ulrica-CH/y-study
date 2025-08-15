import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import postcssPresetEnv from "postcss-preset-env";
// const revResolver = {
//   build: () => Object.assign({}, viteBaseConfig,vitebuildConfig),

//   server: () => Object.assign({}, viteBaseConfig, viteServerConfig);
// };
// https://vite.dev/config/
export default defineConfig(({ command ,mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const args = process.argv.slice(2) // 获取命令行参数
  console.log('自定义参数:', args)
  // console.log('env----',env);
  // console.log(process.env);
  /* "build" | "serve" */
  console.log(command);
  /** 
   * pnpm dev --mode 传入的参数会给到这里
   * pnpm dev --mode cs -> 这里就是cs
   *  */
  console.log(mode); // 'development' | 'production'
 // boolean
// console.log(import.meta.env.PROD); // boolean
  // return revResolver[command]();

  return {
    plugins: [vue()],
    css: {
      modules: {
        // localsConvention: "camelCase" | "camelCaseOnly" | "dashes" | "dashesOnly" 修改key的展示形式
        // scopeBehaviour?: 'global' | 'local'; 是否启用CSS模块化
        // globalModulePaths?: RegExp[]; 不想参与的css模块化的路径
        // exportGlobals?: boolean; 是否导出全局模块
        // generateScopedName?: string | ((name: string, filename: string, css: string) => string); 生成类名
        // hashPrefix?: string; 哈希前缀，混入到generateScopedName（更复杂）
      },
      preprocessorOptions: {
        // scss?: SassPreprocessorOptions;
        // sass?: SassPreprocessorOptions;
        // less?: LessPreprocessorOptions;
        // styl?: StylusPreprocessorOptions;
        // stylus?: StylusPreprocessorOptions;

        less: {
          myBgColor: "red",
        },
      },
      // 开发环境是否生成sourcemap
      devSourcemap: true,
      postcss: {
        plugins: [
          postcssPresetEnv({
            stage: 3,
          }),
        ],
      },
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: "[hash].[name].[ext]",
        },
        
      },
      // 小于1024*1024的资源会内联
      assetsInlineLimit: 1024 * 1024,
    },
  };
});
