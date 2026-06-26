import type { PlantillaFlujo } from "@/types";

export const PLANTILLAS: PlantillaFlujo[] = [
  {
    id: "fade-clasico",
    nombre: "Fade Clásico",
    descripcion: "Degradado clásico de bajo a medio con transición suave.",
    esPredefinida: true,
    pasos: [
      {
        orden: 1,
        titulo: "Consulta y referencia",
        descripcion: "Revisa con el cliente el estilo deseado y toma foto de referencia.",
        requiereFoto: true,
      },
      {
        orden: 2,
        titulo: "Degradado bajo",
        descripcion: "Aplica el degradado en la zona baja (guarda #1-#2).",
        requiereFoto: true,
      },
      {
        orden: 3,
        titulo: "Degradado medio",
        descripcion: "Transición media con técnica de palanca.",
        requiereFoto: true,
      },
      {
        orden: 4,
        titulo: "Perfilado",
        descripcion: "Define líneas y contornos con navaja o trimmer.",
        requiereFoto: false,
      },
      {
        orden: 5,
        titulo: "Acabado final",
        descripcion: "Revisa simetría y toma foto del resultado final.",
        requiereFoto: true,
      },
    ],
  },
  {
    id: "taper-fade",
    nombre: "Taper Fade",
    descripcion: "Degradado taper con transición gradual en sienes y nuca.",
    esPredefinida: true,
    pasos: [
      {
        orden: 1,
        titulo: "Preparación",
        descripcion: "Humedece el cabello y define la línea de trabajo.",
        requiereFoto: false,
      },
      {
        orden: 2,
        titulo: "Taper bajo",
        descripcion: "Inicia el taper en zona de sienes.",
        requiereFoto: true,
      },
      {
        orden: 3,
        titulo: "Taper medio",
        descripcion: "Continúa la transición hacia arriba.",
        requiereFoto: true,
      },
      {
        orden: 4,
        titulo: "Nuca y contornos",
        descripcion: "Define la línea de nuca y orejas.",
        requiereFoto: true,
      },
      {
        orden: 5,
        titulo: "Texturizado superior",
        descripcion: "Trabaja la parte superior con tijera o máquina.",
        requiereFoto: false,
      },
      {
        orden: 6,
        titulo: "Resultado final",
        descripcion: "Foto del acabado completo.",
        requiereFoto: true,
      },
    ],
  },
  {
    id: "buzz-cut",
    nombre: "Buzz Cut",
    descripcion: "Corte uniforme a máquina, rápido y limpio.",
    esPredefinida: true,
    pasos: [
      {
        orden: 1,
        titulo: "Selección de guarda",
        descripcion: "Confirma el número de guarda con el cliente.",
        requiereFoto: true,
      },
      {
        orden: 2,
        titulo: "Corte uniforme",
        descripcion: "Aplica la guarda en toda la cabeza con movimiento constante.",
        requiereFoto: true,
      },
      {
        orden: 3,
        titulo: "Acabado",
        descripcion: "Perfilado de líneas y foto final.",
        requiereFoto: true,
      },
    ],
  },
];

export function obtenerPlantilla(id: string): PlantillaFlujo | undefined {
  return PLANTILLAS.find((p) => p.id === id);
}
