# www.laramedbo.com — página web de LaraMed

Web pública (Next.js 15 + Tailwind v4). **No tiene base de datos propia:** todo sale del ERP
(https://erp.laramedventas.com).

- **Productos:** los marcados «Mostrar en la web» en el ERP (ficha del producto → pestaña
  «Página web»), con su área, título comercial, frase, beneficios y fotos. Sin precios, costos,
  stock ni fichas técnicas.
- **Textos, marcas, clientes y fotos:** ERP → Configuración → Página web.
- **Formularios:** cada envío llega al ERP en Ventas → Solicitudes web (con aviso a los vendedores).
- Los cambios en el ERP aparecen en la web en unos 5 minutos.

## Variables (Vercel → Settings → Environment Variables)

| Variable | Valor |
| --- | --- |
| `ERP_URL` | `https://erp.laramedventas.com` |
| `WEB_API_CLAVE` | la misma clave `WEB_API_CLAVE` del servidor del ERP (secreta) |
| `SITIO_URL` | `https://www.laramedbo.com` |

Sin `ERP_URL` y `WEB_API_CLAVE` la web se ve vacía (sin productos) y el formulario pide escribir
por WhatsApp.

## Páginas

- `/` inicio: áreas, destacados, marcas, servicios, nosotros, clientes y formulario de contacto.
- `/productos` catálogo con filtros por área (`?area=`), marca y búsqueda.
- `/productos/[direccion]` producto con fotos, beneficios y formulario de cotización / ficha técnica.
- `/sitemap.xml` y `/robots.txt` para Google. Las fotos se sirven en `/imagenes/<id>` (pasan al ERP).

## Comandos

`pnpm dev` · `pnpm build` · `pnpm lint` · `pnpm typecheck` · `pnpm test`

Para probar en la computadora: copiar `.env.example` a `.env.local` y llenar la clave.
