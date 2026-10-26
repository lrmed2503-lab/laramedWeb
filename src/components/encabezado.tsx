import Link from "next/link";
import { MenuMovil } from "@/components/menu-movil";
import { claseBoton, IconoWhatsapp } from "@/components/ui";
import { enlaceWhatsapp } from "@/lib/catalogo-base";

const ENLACES = [
  { href: "/productos", texto: "Productos" },
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
          {ENLACES.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              aria-current={actual === e.href ? "page" : undefined}
              className={`rounded-full px-2.5 py-2.5 whitespace-nowrap no-underline xl:px-3.5 ${
                actual === e.href
                  ? "bg-hielo font-semibold text-azul"
                  : "text-tinta hover:bg-hielo hover:text-azul"
              }`}
            >
              {e.texto}
            </Link>
          ))}
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
