# Imagen de la web pública (www.laramedbo.com) para el servidor de Hostinger.
# La construye y arranca el servidor del ERP (laramed-erp/despliegue: instalar-web.sh y actualizar-web.sh).
FROM public.ecr.aws/docker/library/node:22-alpine

RUN corepack enable && corepack prepare pnpm@10.28.0 --activate
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
# Dirección interna del ERP dentro del servidor (las fotos /imagenes/… se pasan ahí).
# Al construir no hay conexión al ERP: las páginas se arman al primer pedido y se guardan 5 minutos.
ARG ERP_URL=http://app:3000
ENV ERP_URL=$ERP_URL
RUN pnpm build

ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
EXPOSE 3000
CMD ["pnpm", "start"]
