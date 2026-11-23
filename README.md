# Parqueadero Público

## Probarla en la Mac
Abre una terminal en esta carpeta y corre:

    python3 -m http.server 8080

Luego abre http://localhost:8080

## Ponerla en el iPhone como app (con tu logo y pantalla completa)
1. Súbela gratis: entra a https://app.netlify.com/drop y arrastra esta carpeta completa.
   Netlify te da un enlace (por ejemplo https://parqueadero-xxxx.netlify.app).
2. Abre ese enlace en **Safari** del iPhone.
3. Toca Compartir → **Agregar a inicio**. Queda con tu logo y se abre sin barras de Safari.

Funciona sin internet. Los datos se guardan en ese celular.

## Seguir con Claude Code
Abre esta carpeta en Claude Code y pídele, por ejemplo:
- "Publica la app en GitHub Pages"
- "Agrega sincronización con Firebase para usarla en dos celulares"
- "Conviértela en app nativa para iPhone con Capacitor"

Claude Code lee `CLAUDE.md` y ya sabe cómo funciona todo, incluidas las tarifas.
