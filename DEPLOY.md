# Deploy a GitHub Pages

Este proyecto está configurado para publicarse en GitHub Pages desde la carpeta `/docs`.

## Configuración

El proyecto ya está configurado con:
- `outputDir: 'docs'` en `vue.config.js`
- `publicPath: './'` para rutas relativas en producción
- Scripts de deploy en `package.json`

## Pasos para hacer deploy

### Opción 1: Usando el script automático
```bash
npm run deploy
```

Este comando:
1. Ejecuta el build del proyecto
2. Agrega la carpeta `docs` al staging
3. Hace commit con el mensaje "Deploy to GitHub Pages"
4. Hace push al repositorio

### Opción 2: Manual
```bash
# 1. Hacer build del proyecto
npm run build

# 2. Agregar la carpeta docs al repositorio
git add docs

# 3. Hacer commit
git commit -m "Deploy to GitHub Pages"

# 4. Hacer push
git push origin main
```

## Configuración en GitHub

1. Ve a tu repositorio en GitHub
2. Ve a Settings > Pages
3. En "Source", selecciona:
   - Branch: `main`
   - Folder: `/docs`
4. Guarda los cambios

## Verificación

Después del deploy, tu sitio estará disponible en:
`https://[tu-usuario].github.io/[nombre-del-repositorio]`

El deploy puede tomar unos minutos en estar disponible.

## Notas importantes

- La carpeta `docs` se genera automáticamente con `npm run build`
- No modifiques manualmente los archivos en la carpeta `docs`
- Siempre usa `npm run build` antes de hacer deploy
- Si cambias la configuración de rutas, asegúrate de que `publicPath` esté configurado correctamente 