const { defineConfig } = require("@vue/cli-service");
const proxy = require("http-proxy-middleware");

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      "/weather_api": {
        target: "https://api.openweathermap.org",
        changeOrigin: true,
        pathRewrite: {
          "/weather_api": "",
        },
      },
      "/mock_api": {
        target: "https://run.mocky.io",
        changeOrigin: true,
        pathRewrite: {
          "/mock_api": "",
        },
      },
    },
  },
});
