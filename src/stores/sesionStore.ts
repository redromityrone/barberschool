import { create } from "zustand";
import type { MarcaReferencia, Foto, SesionCorte } from "@/types";

interface SesionState {
  sesionActual: SesionCorte | null;
  iniciarSesion: (plantillaId: string, nombreCliente?: string) => void;
  avanzarPaso: () => void;
  retrocederPaso: () => void;
  agregarFoto: (foto: Foto) => void;
  actualizarMarcas: (marcas: MarcaReferencia[]) => void;
  completarSesion: () => void;
  limpiarSesion: () => void;
}

function crearSesionVacia(
  plantillaId: string,
  nombreCliente?: string
): SesionCorte {
  const ahora = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    plantillaId,
    nombreCliente,
    pasoActual: 1,
    pasosCompletados: [],
    fotos: [],
    marcas: [],
    estado: "en_progreso",
    creadoEn: ahora,
    actualizadoEn: ahora,
  };
}

export const useSesionStore = create<SesionState>((set) => ({
  sesionActual: null,

  iniciarSesion: (plantillaId, nombreCliente) =>
    set({ sesionActual: crearSesionVacia(plantillaId, nombreCliente) }),

  avanzarPaso: () =>
    set((state) => {
      if (!state.sesionActual) return state;
      const paso = state.sesionActual.pasoActual;
      return {
        sesionActual: {
          ...state.sesionActual,
          pasoActual: paso + 1,
          pasosCompletados: [...state.sesionActual.pasosCompletados, paso],
          actualizadoEn: new Date().toISOString(),
        },
      };
    }),

  retrocederPaso: () =>
    set((state) => {
      if (!state.sesionActual || state.sesionActual.pasoActual <= 1)
        return state;
      return {
        sesionActual: {
          ...state.sesionActual,
          pasoActual: state.sesionActual.pasoActual - 1,
          actualizadoEn: new Date().toISOString(),
        },
      };
    }),

  agregarFoto: (foto) =>
    set((state) => {
      if (!state.sesionActual) return state;
      return {
        sesionActual: {
          ...state.sesionActual,
          fotos: [...state.sesionActual.fotos, foto],
          actualizadoEn: new Date().toISOString(),
        },
      };
    }),

  actualizarMarcas: (marcas) =>
    set((state) => {
      if (!state.sesionActual) return state;
      return {
        sesionActual: {
          ...state.sesionActual,
          marcas,
          actualizadoEn: new Date().toISOString(),
        },
      };
    }),

  completarSesion: () =>
    set((state) => {
      if (!state.sesionActual) return state;
      return {
        sesionActual: {
          ...state.sesionActual,
          estado: "completada",
          actualizadoEn: new Date().toISOString(),
        },
      };
    }),

  limpiarSesion: () => set({ sesionActual: null }),
}));
