import { describe, expect, it } from "vitest";
import {
  CATALOGO_VACIO,
  descripcionProducto,
  destacados,
  enlaceMapa,
  enlaceWhatsapp,
  estaEnArea,
  etiquetaProducto,
  filtrarProductos,
  fotoDeArea,
  marcasDeProductos,
  oficinasDeEmpresa,
  type Producto,
  relacionados,
  srcsetImagen,
  urlImagen,
} from "./catalogo-base";

const p = (o: Partial<Producto> & { slug: string }): Producto => ({
  codigo: o.slug.toUpperCase(),
  titulo: o.slug,
  nombre: o.slug,
  marca: null,
  modelo: null,
  pais: null,
  registroAgemed: null,
  area: null,
  frase: null,
  beneficios: [],
  destacado: false,
  fotos: [],
  actualizado: "2026-10-24T00:00:00.000Z",
  ...o,
});

const ventilador = p({
  slug: "ventilador-vg70",
  titulo: "Ventilador mecánico VG70",
  nombre: "Ventilador mecánico",
  marca: "Aeonmed",
  modelo: "VG70",
  area: "cuidados-intensivos",
  fotos: ["/api/web/imagen/a1"],
});
const monitor = p({
  slug: "monitor-ame60",
  titulo: "Monitor multiparamétrico AME-60",
  nombre: "Monitor multiparamétrico",
  marca: "AEONMED",
  area: "monitoreo",
  destacado: true,
});
const placas = p({
  slug: "placas",
  titulo: "Placas radiográficas",
  area: "insumos",
});
const todos = [ventilador, monitor, placas];

describe("imágenes", () => {
  it("pasan por /imagenes con la versión liviana", () => {
    expect(urlImagen("/api/web/imagen/abc")).toBe("/imagenes/abc");
    expect(urlImagen("/api/web/imagen/abc", 320)).toBe(
      "/imagenes/abc?ancho=320",
    );
    expect(srcsetImagen("/api/web/imagen/abc")).toBe(
      "/imagenes/abc?ancho=320 320w, /imagenes/abc?ancho=800 800w, /imagenes/abc?ancho=1600 1600w",
    );
  });
});

describe("filtrarProductos", () => {
  it("por área, marca (sin importar mayúsculas) y texto sin tildes", () => {
    expect(filtrarProductos(todos, { area: "monitoreo" })).toEqual([monitor]);
    expect(filtrarProductos(todos, { marca: "AEONMED" })).toEqual([
      ventilador,
      monitor,
    ]);
    expect(filtrarProductos(todos, { q: "mecanico vg" })).toEqual([ventilador]);
    expect(filtrarProductos(todos, { q: "  " })).toEqual(todos);
    expect(
      filtrarProductos(todos, { area: "insumos", q: "ventilador" }),
    ).toEqual([]);
  });
});

describe("marcas y destacados", () => {
  it("marcas sin repetir, ordenadas", () => {
    expect(marcasDeProductos(todos)).toEqual(["AEONMED"]);
  });
  it("destacados primero, luego con foto", () => {
    expect(destacados(todos)).toEqual([monitor, ventilador]);
    expect(destacados(todos, 1)).toEqual([monitor]);
  });
  it("relacionados por área o marca", () => {
    expect(relacionados(todos, ventilador)).toEqual([monitor]);
    expect(relacionados(todos, placas)).toEqual([]);
  });
  it("foto de un área", () => {
    expect(fotoDeArea(todos, "cuidados-intensivos")).toBe("/api/web/imagen/a1");
    expect(fotoDeArea(todos, "monitoreo")).toBeNull();
  });
});

describe("textos", () => {
  it("WhatsApp con 591 y mensaje", () => {
    expect(enlaceWhatsapp("697-22332")).toBe("https://wa.me/59169722332");
    expect(enlaceWhatsapp("69722332", "Hola ñ")).toBe(
      "https://wa.me/59169722332?text=Hola%20%C3%B1",
    );
  });
  it("etiqueta y descripción", () => {
    expect(etiquetaProducto({ marca: "Aeonmed", pais: "China" })).toBe(
      "AEONMED · CHINA",
    );
    expect(etiquetaProducto({ marca: null, pais: null })).toBe("");
    expect(descripcionProducto(ventilador)).toBe(
      "Ventilador mecánico, marca Aeonmed, modelo VG70. Cotización, instalación y servicio técnico en Bolivia.",
    );
    const largo = descripcionProducto({
      ...ventilador,
      frase: "palabra ".repeat(40),
    });
    expect(largo.length).toBeLessThanOrEqual(156);
    expect(largo.endsWith("…")).toBe(true);
  });
});

describe("oficinas", () => {
  it("usa las direcciones del ERP o, si faltan, las ciudades", () => {
    expect(
      oficinasDeEmpresa(CATALOGO_VACIO.empresa).map((o) => o.ciudad),
    ).toEqual(["La Paz", "El Alto", "Cochabamba"]);
    const conDir = {
      ciudad: "La Paz",
      direccion: "Av. Villalobos #1660",
      nota: null,
    };
    expect(
      oficinasDeEmpresa({ ...CATALOGO_VACIO.empresa, direcciones: [conDir] }),
    ).toEqual([conDir]);
  });
  it("enlace a Google Maps", () => {
    expect(
      enlaceMapa({
        ciudad: "La Paz",
        direccion: "Av. Villalobos #1660",
        nota: null,
      }),
    ).toBe(
      "https://www.google.com/maps/search/?api=1&query=Av.%20Villalobos%20%231660%2C%20La%20Paz%2C%20Bolivia",
    );
  });
});

describe("también se usa en", () => {
  const bomba = p({
    slug: "bomba",
    area: "infusion",
    areas: ["infusion", "quirofano", "cuidados-intensivos"],
    fotos: ["/api/web/imagen/b1"],
  });
  it("aparece en su área principal y en las adicionales", () => {
    expect(estaEnArea(bomba, "infusion")).toBe(true);
    expect(estaEnArea(bomba, "quirofano")).toBe(true);
    expect(estaEnArea(bomba, "monitoreo")).toBe(false);
    expect(estaEnArea(monitor, "monitoreo")).toBe(true);
    expect(filtrarProductos([...todos, bomba], { area: "quirofano" })).toEqual([
      bomba,
    ]);
  });
  it("la foto del área prefiere el área principal", () => {
    expect(fotoDeArea([bomba, ventilador], "cuidados-intensivos")).toBe(
      "/api/web/imagen/a1",
    );
    expect(fotoDeArea([bomba], "quirofano")).toBe("/api/web/imagen/b1");
  });
  it("relacionados por un área en común", () => {
    expect(relacionados([ventilador, bomba], ventilador)).toEqual([bomba]);
  });
});
