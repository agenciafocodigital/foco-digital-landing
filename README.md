# Foco Digital

Landing page de Foco Digital creada con Next.js App Router, TypeScript y Tailwind CSS.

## Ejecutar localmente

1. Instala las dependencias con npm install.
2. Inicia el sitio con npm run dev.
3. Abre http://localhost:3000.

## Verificación antes de publicar

- npm run lint
- npm run build

## Despliegue

El proyecto está preparado para Vercel. Para Netlify, conecta este repositorio como un sitio Next.js y usa el comando de compilación npm run build.

Configura la variable de entorno NEXT_PUBLIC_SITE_URL con la URL pública final, por ejemplo https://tudominio.mx. Esto activa las URLs absolutas del sitemap y la URL canónica para SEO.

## Antes de producción

- Sustituye las fotografías de Unsplash por fotografías con licencia y aprobadas por Foco Digital.
- Completa en el Aviso de Privacidad el domicilio y correo de privacidad del responsable.
- Conecta el formulario a un CRM o proveedor de formularios si se desea almacenar solicitudes. Actualmente valida los datos y abre una conversación prellenada de WhatsApp; no guarda información.
