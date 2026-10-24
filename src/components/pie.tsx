import Link from "next/link";
import { IconoWhatsapp } from "@/components/ui";
import { type Empresa, enlaceWhatsapp } from "@/lib/catalogo-base";

export function Pie({ empresa }: { empresa: Empresa }) {
  const anio = new Date().getFullYear();
  return (
    <footer className="bg-tinta text-niebla-clara">
      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-8 px-4 py-12 text-sm leading-relaxed sm:px-6">
        <div className="min-w-56 flex-1">
          <span className="inline-block rounded-xl bg-white px-3 py-2">
            {/* biome-ignore lint/performance/noImgElement: logo liviano */}
            <img
              src="/logo-laramed.webp"
              alt="LaraMed"
              width={150}
              height={38}
              className="block h-9 w-auto"
            />
          </span>
          <p className="mt-3 mb-0">Trabajamos por la salud de su paciente.</p>
          <p className="m-0">
            {empresa.cobertura}. Desde {empresa.desde}.
          </p>
        </div>
        <div className="min-w-56 flex-1">
          <p className="m-0 font-semibold text-white">Oficinas</p>
          {empresa.direccion && <p className="m-0">{empresa.direccion}</p>}
          <p className="m-0">{empresa.oficinas.join(" · ")}</p>
        </div>
        <div className="min-w-48 flex-1">
          <p className="m-0 font-semibold text-white">Contacto</p>
          {empresa.telefonos && <p className="m-0">Tel. {empresa.telefonos}</p>}
          <p className="m-0">
            <a
              href={enlaceWhatsapp(empresa.whatsapp)}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-niebla-clara hover:text-white"
            >
              <IconoWhatsapp className="size-4" /> {empresa.whatsapp}
            </a>
          </p>
          <p className="m-0">
            <a
              href={`mailto:${empresa.correo}`}
              className="text-niebla-clara hover:text-white"
            >
              {empresa.correo}
            </a>
          </p>
        </div>
        <div className="min-w-40 flex-1">
          <p className="m-0 font-semibold text-white">Enlaces</p>
          <p className="m-0">
            <Link
              href="/productos"
              className="text-niebla-clara hover:text-white"
            >
              Catálogo
            </Link>
          </p>
          {empresa.facebook && (
            <p className="m-0">
              <a
                href={empresa.facebook}
                target="_blank"
                rel="noopener"
                className="text-niebla-clara hover:text-white"
              >
                Facebook
              </a>
            </p>
          )}
          {empresa.tiktok && (
            <p className="m-0">
              <a
                href={empresa.tiktok}
                target="_blank"
                rel="noopener"
                className="text-niebla-clara hover:text-white"
              >
                TikTok
              </a>
            </p>
          )}
        </div>
      </div>
      <p className="m-0 border-t border-white/10 px-4 py-4 text-center text-xs max-md:pb-24">
        © {anio} LaraMed S.R.L. · Bolivia
      </p>
    </footer>
  );
}

/** Botones fijos abajo en el celular: WhatsApp y Cotizar. */
export function BarraMovil({
  whatsapp,
  cotizar = "/#contacto",
}: {
  whatsapp: string;
  cotizar?: string;
}) {
  return (
    <div className="fixed inset-x-3 bottom-3 z-20 flex gap-2 rounded-full bg-white p-2 shadow-[0_8px_24px_rgba(2,30,94,0.18)] md:hidden">
      <a
        href={enlaceWhatsapp(whatsapp, "Hola LaraMed, quisiera información.")}
        target="_blank"
        rel="noopener"
        className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#1f7a43] font-bold text-white no-underline hover:text-white"
      >
        <IconoWhatsapp className="size-[18px]" color="#FFFFFF" />
        WhatsApp
      </a>
      <Link
        href={cotizar}
        className="flex min-h-11 flex-1 items-center justify-center rounded-full bg-azul font-bold text-white no-underline hover:text-white"
      >
        Cotizar
      </Link>
    </div>
  );
}
