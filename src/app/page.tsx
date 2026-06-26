import Link from "next/link";
import { PLANTILLAS } from "@/data/plantillas";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      <header className="px-6 pt-10 pb-6 border-b border-zinc-800">
        <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-2">
          BarberSchool
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          Tu taller digital
        </h1>
        <p className="mt-2 text-zinc-400 text-base leading-relaxed">
          Documenta cortes, sigue el flujo paso a paso y guarda fotos en tu
          Drive.
        </p>
      </header>

      <main className="flex-1 px-6 py-8">
        <h2 className="text-lg font-semibold mb-4 text-zinc-200">
          Selecciona un estilo
        </h2>
        <ul className="flex flex-col gap-3">
          {PLANTILLAS.map((plantilla) => (
            <li key={plantilla.id}>
              <Link
                href={`/sesion/nueva?plantilla=${plantilla.id}`}
                className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-amber-500/50 hover:bg-zinc-800 active:scale-[0.98]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-zinc-50">
                      {plantilla.nombre}
                    </p>
                    <p className="mt-1 text-sm text-zinc-400 leading-snug">
                      {plantilla.descripcion}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400">
                    {plantilla.pasos.length} pasos
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className="px-6 py-6 border-t border-zinc-800 text-center text-xs text-zinc-600">
        Fase 0 — Fundación ·{" "}
        <Link href="/docs" className="underline hover:text-zinc-400">
          Ver specs
        </Link>
      </footer>
    </div>
  );
}
