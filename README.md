# Sitio web · Agencia Foco Digital

Sitio estático de la agencia (HTML, CSS y JavaScript sin dependencias), publicado en Netlify.

- **Carpeta publicada:** `site/` (ver `netlify.toml`).
- **Formularios:** Netlify Forms (`contacto-foco-digital`, `diagnostico-foco-digital`, `calculadora-foco-digital`).
- **Redirecciones y encabezados:** `netlify.toml`.
- **Estilos:** `site/assets/site.css` → `redesign.css` → `experience.css` → `mejoras.css` (en ese orden).
- **Dominio previsto:** agenciafocodigital.com. Mientras no se conecte, las páginas llevan `noindex` y `robots.txt` bloquea el rastreo.

## Probar en local

```bash
cd site
python3 -m http.server 8080
```

Los formularios solo envían en Netlify (vista previa o producción).

## Reglas

Ningún cambio se publica ni se fusiona a `main` sin la aprobación de Frank. Los cambios se trabajan en una rama y se revisan en la vista previa de Netlify.
