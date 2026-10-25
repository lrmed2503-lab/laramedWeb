import type { NextConfig } from "next";

const erp = (process.env.ERP_URL ?? "").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Las fotos vienen del ERP (con versiones livianas ?ancho=) y se sirven bajo esta misma dirección.
  async rewrites() {
    return erp
      ? [{ source: "/imagenes/:id", destination: `${erp}/api/web/imagen/:id` }]
      : [];
  },
  // Direcciones de la web anterior (Sanity) que pueden estar en Google o en enlaces compartidos.
  async redirects() {
    return [
      {
        source: "/categorias/:slug*",
        destination: "/productos",
        permanent: true,
      },
      { source: "/sobre-nosotros", destination: "/nosotros", permanent: true },
      {
        source: "/servicios",
        destination: "/servicios/servicio-tecnico",
        permanent: false,
      },
      { source: "/contactos", destination: "/#contacto", permanent: true },
      { source: "/noticias", destination: "/", permanent: true },
      { source: "/admin/:path*", destination: "/", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
