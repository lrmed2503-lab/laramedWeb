/** Dirección pública de la web (para Google, enlaces y sitemap). */
export function sitioUrl() {
  return (process.env.SITIO_URL || "https://www.laramedbo.com").replace(
    /\/+$/,
    "",
  );
}
