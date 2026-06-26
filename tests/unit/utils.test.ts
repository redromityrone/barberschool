import { describe, it, expect } from "vitest";
import { generarNombreArchivo, formatearFecha } from "@/lib/utils";
import { PLANTILLAS, obtenerPlantilla } from "@/data/plantillas";

describe("generarNombreArchivo", () => {
  it("genera slug sin acentos y con orden", () => {
    expect(generarNombreArchivo(2, "Degradado bajo")).toBe(
      "02-degradado-bajo.jpg"
    );
  });

  it("rellena con cero el orden de un dígito", () => {
    expect(generarNombreArchivo(1, "Inicio")).toBe("01-inicio.jpg");
  });
});

describe("formatearFecha", () => {
  it("formatea una fecha ISO en español", () => {
    const resultado = formatearFecha("2026-06-26T12:00:00.000Z");
    expect(resultado).toMatch(/2026/);
  });
});

describe("plantillas", () => {
  it("tiene al menos 3 plantillas predefinidas", () => {
    expect(PLANTILLAS.length).toBeGreaterThanOrEqual(3);
  });

  it("obtiene plantilla por id", () => {
    const plantilla = obtenerPlantilla("fade-clasico");
    expect(plantilla?.nombre).toBe("Fade Clásico");
  });

  it("retorna undefined para id inexistente", () => {
    expect(obtenerPlantilla("no-existe")).toBeUndefined();
  });
});
