"use client";

import { useState } from "react";
import { Foto, SinFoto } from "@/components/ui";

/** Foto grande y miniaturas para cambiarla. */
export function Galeria({ fotos, alt }: { fotos: string[]; alt: string }) {
  const [actual, setActual] = useState(0);
  if (!fotos.length) {
    return <SinFoto className="h-80 rounded-[32px] bg-hielo sm:h-[480px]" />;
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-80 items-center justify-center rounded-[32px] bg-hielo p-6 sm:h-[480px] sm:p-8">
        <Foto
          key={fotos[actual]}
          ruta={fotos[actual]}
          alt={actual === 0 ? alt : `${alt}, foto ${actual + 1}`}
          sizes="(max-width: 768px) 90vw, 560px"
          className="block size-full object-contain mix-blend-multiply"
          prioridad={actual === 0}
        />
      </div>
      {fotos.length > 1 && (
        <div className="flex flex-wrap gap-2.5">
          {fotos.map((f, i) => (
            <button
              key={f}
              type="button"
              onClick={() => setActual(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-pressed={actual === i}
              className={`size-[84px] cursor-pointer rounded-2xl border-2 bg-hielo p-1.5 ${
                actual === i ? "border-azul" : "border-transparent"
              }`}
            >
              <Foto
                ruta={f}
                alt=""
                sizes="84px"
                className="size-full object-contain mix-blend-multiply"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
