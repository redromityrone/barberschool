export function formatearFecha(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function generarNombreArchivo(
  pasoOrden: number,
  tituloPaso: string
): string {
  const slug = tituloPaso
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const orden = String(pasoOrden).padStart(2, "0");
  return `${orden}-${slug}.jpg`;
}
