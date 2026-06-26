export interface PasoFlujo {
  orden: number;
  titulo: string;
  descripcion: string;
  requiereFoto: boolean;
}

export interface PlantillaFlujo {
  id: string;
  nombre: string;
  descripcion: string;
  pasos: PasoFlujo[];
  imagenReferenciaUrl?: string;
  marcasDefecto?: MarcaReferencia[];
  esPredefinida: boolean;
}

export interface MarcaReferencia {
  id: string;
  tipo: "linea" | "punto" | "zona";
  x: number;
  y: number;
  ancho?: number;
  alto?: number;
  color: string;
  grosor: number;
}

export interface Foto {
  id: string;
  sesionId: string;
  pasoOrden: number;
  nombreArchivo: string;
  driveFileId?: string;
  estadoSubida: "pendiente" | "subiendo" | "completada" | "error";
  capturadoEn: string;
}

export interface SesionCorte {
  id: string;
  plantillaId: string;
  nombreCliente?: string;
  pasoActual: number;
  pasosCompletados: number[];
  fotos: Foto[];
  marcas: MarcaReferencia[];
  imagenReferencia?: string;
  estado: "en_progreso" | "completada" | "pendiente_subida";
  carpetaDriveId?: string;
  creadoEn: string;
  actualizadoEn: string;
}
