const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // Desactiva ESLint durante el desarrollo
  outputDir: 'docs', // Genera el build en la carpeta docs para GitHub Pages
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // Configuración para rutas relativas en producción
  devServer: {
    port: 8080,
    open: true
  }
}) 