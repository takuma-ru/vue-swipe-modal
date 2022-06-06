const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../docs',
  assetsDir: './',
  publicPath: './',
})
