"use client";

import { claseBoton } from "@/components/ui";

/** Si el catálogo no responde un momento: mensaje amable y contacto directo. */
export default function ErrorPagina({ reset }: { reset: () => void }) {
  return (
    <section className="mx-auto flex max-w-[720px] flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="m-0 font-titulo text-[30px] font-bold text-noche">
        Estamos actualizando el catálogo
      </h1>
      <p className="m-0 text-lg text-niebla">
        Vuelva a intentar en un momento. Si lo necesita ahora, escríbanos por
        WhatsApp al 69722332.
      </p>
      <div className="flex flex-wrap justify-center gap-2.5">
        <button
          type="button"
          onClick={reset}
          className={claseBoton("primario")}
        >
          Intentar de nuevo
        </button>
        <a
          href="https://wa.me/59169722332"
          target="_blank"
          rel="noopener"
          className={claseBoton("borde")}
        >
          WhatsApp
        </a>
      </div>
    </section>
  );
}
