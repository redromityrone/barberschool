"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSesionStore } from "@/stores/sesionStore";
import { obtenerPlantilla } from "@/data/plantillas";

function SesionContent() {
  const searchParams = useSearchParams();
  const plantillaId = searchParams.get("plantilla") ?? "fade-clasico";
  const plantilla = obtenerPlantilla(plantillaId);
  const { sesionActual, iniciarSesion, avanzarPaso, retrocederPaso } =
    useSesionStore();

  useEffect(() => {
    if (!sesionActual || sesionActual.plantillaId !== plantillaId) {
      iniciarSesion(plantillaId);
    }
  }, [plantillaId, sesionActual, iniciarSesion]);

  if (!plantilla) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full p-6 text-center">
        <p className="text-zinc-400">Plantilla no encontrada.</p>
        <Link href="/" className="mt-4 text-amber-400 underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const pasoActual = plantilla.pasos.find(
    (p) => p.orden === (sesionActual?.pasoActual ?? 1)
  );
  const totalPasos = plantilla.pasos.length;
  const progreso = sesionActual
    ? Math.round((sesionActual.pasoActual / totalPasos) * 100)
    : 0;

  return (
    <div className="flex flex-col min-h-full">
      <header className="px-6 pt-8 pb-4 border-b border-zinc-800">
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-300">
          ← Inicio
        </Link>
        <h1 className="mt-2 text-xl font-bold">{plantilla.nombre}</h1>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-zinc-500 mb-1">
            <span>
              Paso {sesionActual?.pasoActual ?? 1} de {totalPasos}
            </span>
            <span>{progreso}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-400 transition-all duration-300"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-900 aspect-[3/4] flex flex-col items-center justify-center gap-4">
          <div className="text-5xl">📷</div>
          <p className="text-zinc-500 text-sm text-center px-6">
            Cámara disponible en Fase 1
          </p>
        </div>

        {pasoActual && (
          <div className="mt-8 w-full max-w-sm">
            <p className="text-amber-400 text-sm font-medium">
              Paso {pasoActual.orden}
            </p>
            <h2 className="text-xl font-semibold mt-1">{pasoActual.titulo}</h2>
            <p className="mt-2 text-zinc-400 text-sm leading-relaxed">
              {pasoActual.descripcion}
            </p>
            {pasoActual.requiereFoto && (
              <p className="mt-3 text-xs text-amber-500/80 flex items-center gap-1">
                <span>●</span> Se requiere foto para avanzar
              </p>
            )}
          </div>
        )}
      </main>

      <footer className="px-6 py-6 flex gap-3 border-t border-zinc-800">
        <button
          type="button"
          onClick={retrocederPaso}
          disabled={(sesionActual?.pasoActual ?? 1) <= 1}
          className="flex-1 h-14 rounded-2xl border border-zinc-700 text-zinc-300 font-medium disabled:opacity-30 active:scale-[0.98] transition-transform"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={avanzarPaso}
          disabled={(sesionActual?.pasoActual ?? 1) >= totalPasos}
          className="flex-1 h-14 rounded-2xl bg-amber-400 text-zinc-950 font-semibold disabled:opacity-30 active:scale-[0.98] transition-transform"
        >
          Siguiente
        </button>
      </footer>
    </div>
  );
}

export default function NuevaSesionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-full text-zinc-500">
          Cargando sesión…
        </div>
      }
    >
      <SesionContent />
    </Suspense>
  );
}
