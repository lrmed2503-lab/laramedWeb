"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export type EnlaceMenu = {
  href: string;
  texto: string;
  detalle?: string;
  /** Submenú (p. ej. las familias de Productos). */
  hijos?: EnlaceMenu[];
};

/** Menú ☰ del celular: se cierra solo al elegir una página. */
export function MenuMovil({ enlaces }: { enlaces: EnlaceMenu[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const ruta = usePathname();
  // biome-ignore lint/correctness/useExhaustiveDependencies: cerrar al cambiar de página
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [ruta]);
  const cerrar = () => {
    if (ref.current) ref.current.open = false;
  };
  return (
    <details ref={ref} className="relative ml-auto lg:hidden">
      <summary
        aria-label="Abrir menú"
        className="flex size-11 cursor-pointer items-center justify-center rounded-xl border border-linea"
      >
        <Menu className="size-6" aria-hidden="true" />
      </summary>
      <nav
        aria-label="Menú"
        className="absolute right-0 mt-2 flex w-64 flex-col rounded-2xl border border-linea bg-white p-2 font-titulo text-[17px] shadow-[0_12px_32px_rgba(2,30,94,0.14)]"
      >
        {enlaces.map((e) =>
          e.hijos ? (
            <div key={e.href} className="flex flex-col">
              <span className="px-4 pt-3 pb-1 text-xs font-bold tracking-[2px] text-niebla uppercase">
                {e.texto}
              </span>
              {e.hijos.map((h) => (
                <Link
                  key={h.href}
                  href={h.href}
                  onClick={cerrar}
                  className="rounded-xl py-3 pr-4 pl-6 text-tinta no-underline hover:bg-hielo"
                >
                  {h.texto}
                </Link>
              ))}
            </div>
          ) : (
            <Link
              key={e.href}
              href={e.href}
              onClick={cerrar}
              className="rounded-xl px-4 py-3 text-tinta no-underline hover:bg-hielo"
            >
              {e.texto}
            </Link>
          ),
        )}
      </nav>
    </details>
  );
}
