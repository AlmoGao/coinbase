const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/api": {
        target: "https://www.set-delta.com/",
        changeOrigin: true,
        logLevel: "debug",
        // pathRewrite: {
        //   "^/api": "/",
        // },
      },
    },
  },
});
