const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // Desactiva ESLint durante el desarrollo
  devServer: {
    port: 8080,
    open: true
  }
}) 