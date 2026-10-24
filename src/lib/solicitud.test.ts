import { describe, expect, it } from "vitest";
import { esquemaSolicitud, ipCliente, primerError } from "./solicitud";

const base = { nombre: "Ana Rojas", celular: "", correo: "" };

describe("esquemaSolicitud", () => {
  it("pide celular o correo", () => {
    const r = esquemaSolicitud.safeParse(base);
    expect(r.success).toBe(false);
    if (!r.success)
      expect(primerError(r.error)).toEqual({
        error: "Deje un celular o un correo para responderle.",
        campo: "celular",
      });
  });
  it("acepta celular boliviano y limpia el resto", () => {
    const r = esquemaSolicitud.parse({
      ...base,
      celular: "+591 697-22332",
      tipo: "ficha",
    });
    expect(r.tipo).toBe("ficha");
    expect(r.institucion).toBe("");
  });
  it("tipo desconocido = consulta general; correo malo = error", () => {
    expect(
      esquemaSolicitud.parse({ ...base, correo: "a@b.bo", tipo: "x" }).tipo,
    ).toBe("contacto");
    expect(
      esquemaSolicitud.safeParse({ ...base, correo: "nada" }).success,
    ).toBe(false);
  });
});

describe("ipCliente", () => {
  it("toma la primera IP", () => {
    const h = new Headers({ "x-forwarded-for": "1.2.3.4, 10.0.0.1" });
    expect(ipCliente(h)).toBe("1.2.3.4");
    expect(ipCliente(new Headers())).toBe("");
  });
});
