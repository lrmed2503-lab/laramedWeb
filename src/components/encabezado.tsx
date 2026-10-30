import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { type EnlaceMenu, MenuMovil } from "@/components/menu-movil";
import { claseBoton, IconoWhatsapp } from "@/components/ui";
import { enlaceWhatsapp, FAMILIAS, ORDEN_FAMILIAS } from "@/lib/catalogo-base";

const ENLACES: EnlaceMenu[] = [
  {
    href: "/productos",
    texto: "Productos",
    hijos: ORDEN_FAMILIAS.map((f) => ({
      href: FAMILIAS[f].ruta,
      texto: FAMILIAS[f].nombre,
      detalle: FAMILIAS[f].detalle,
    })),
  },
  { href: "/veterinaria", texto: "Veterinaria" },
  { href: "/servicios/servicio-tecnico", texto: "Servicio técnico" },
  { href: "/servicios/alquiler-de-equipos", texto: "Alquiler" },
  { href: "/nosotros", texto: "Nosotros" },
  { href: "/#contacto", texto: "Contacto" },
];

const Logo = () => (
  <Link href="/" aria-label="LaraMed, inicio" className="shrink-0">
    {/* biome-ignore lint/performance/noImgElement: logo liviano (webp de 4 KB) */}
    <img
      src="/logo-laramed.webp"
      alt="LaraMed"
      width={174}
      height={44}
      className="block h-11 w-auto"
    />
  </Link>
);

/** Encabezado fijo arriba; en el celular el menú se abre con ☰ (funciona sin JavaScript). */
export function Encabezado({
  whatsapp,
  actual,
}: {
  whatsapp: string;
  actual?: string;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-linea bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1240px] items-center gap-4 px-4 py-3 sm:px-6 xl:gap-6">
        <Logo />
        <nav
          aria-label="Principal"
          className="hidden flex-1 gap-1 font-titulo text-[15px] lg:flex"
        >
          {ENLACES.map((e) => {
            const clase = `rounded-full px-2.5 py-2.5 whitespace-nowrap no-underline xl:px-3.5 ${
              actual === e.href
                ? "bg-hielo font-semibold text-azul"
                : "text-tinta hover:bg-hielo hover:text-azul"
            }`;
            if (!e.hijos)
              return (
                <Link
                  key={e.href}
                  href={e.href}
                  aria-current={actual === e.href ? "page" : undefined}
                  className={clase}
                >
                  {e.texto}
                </Link>
              );
            // Submenú sin JavaScript: se abre al pasar el mouse o al llegar con el teclado (Tab).
            return (
              <div key={e.href} className="group relative">
                <Link
                  href={e.href}
                  aria-haspopup="true"
                  className={`${clase} inline-flex items-center gap-1`}
                >
                  {e.texto}
                  <ChevronDown
                    className="size-4 transition-transform group-focus-within:rotate-180 group-hover:rotate-180"
                    aria-hidden="true"
                  />
                </Link>
                <div className="invisible absolute top-full left-0 z-30 pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="m-0 flex w-80 list-none flex-col rounded-2xl border border-linea bg-white p-2 shadow-[0_12px_32px_rgba(2,30,94,0.14)]">
                    {e.hijos.map((h) => (
                      <li key={h.href}>
                        <Link
                          href={h.href}
                          className="flex flex-col gap-0.5 rounded-xl px-4 py-3 no-underline hover:bg-hielo"
                        >
                          <span className="font-semibold text-noche">
                            {h.texto}
                          </span>
                          {h.detalle && (
                            <span className="font-sans text-[13px] leading-snug text-niebla">
                              {h.detalle}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>
        <div className="ml-auto hidden items-center gap-2.5 md:flex">
          <a
            href={enlaceWhatsapp(
              whatsapp,
              "Hola LaraMed, quisiera información.",
            )}
            target="_blank"
            rel="noopener"
            // Entre 1024 y 1279 px el menú necesita el espacio; el WhatsApp sigue en el pie y en Contacto.
            className={`${claseBoton("borde", true)} lg:max-xl:hidden`}
          >
            <IconoWhatsapp className="size-[18px]" />
            {whatsapp}
          </a>
          <Link href="/#contacto" className={claseBoton("primario", true)}>
            Solicitar cotización
          </Link>
        </div>
        <MenuMovil enlaces={ENLACES} />
      </div>
    </header>
  );
}
