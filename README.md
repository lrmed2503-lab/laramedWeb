# www.laramedbo.com — página web de LaraMed

Web pública (Next.js 15 + Tailwind v4). **No tiene base de datos propia:** todo sale del ERP
(https://erp.laramedventas.com).

- **Productos:** los marcados «Mostrar en la web» en el ERP (ficha del producto → pestaña
  «Página web»), con su área, título comercial, frase, beneficios y fotos. Sin precios, costos,
  stock ni fichas técnicas.
- **Textos, marcas, clientes y fotos:** ERP → Configuración → Página web.
- **Formularios:** cada envío llega al ERP en Ventas → Solicitudes web (con aviso a los vendedores).
- Los cambios en el ERP aparecen en la web en unos 5 minutos.

## Dónde corre

En el **mismo servidor del ERP** (VPS de Hostinger), como una caja más de Docker (`web`), detrás
del mismo candado HTTPS (Caddy). Se instala una vez con `despliegue/instalar-web.sh` del repositorio
`laramed-erp` y desde ahí **se actualiza sola** cada 5 minutos cuando cambia `main` de este
repositorio (guía: `docs/servidor.md` del ERP, «Página web»).

Variables (las pone el servidor; la clave sale de su `.env` y nunca va a GitHub):

| Variable | Valor en el servidor |
| --- | --- |
| `ERP_URL` | `http://app:3000` (el ERP por dentro del servidor) |
| `WEB_API_CLAVE` | la misma `WEB_API_CLAVE` del ERP |
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
