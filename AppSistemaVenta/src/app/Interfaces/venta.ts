import { DetalleVenta } from "./detalle-venta"; // Hace referencia a la interfaz DetalleVenta

export interface Venta {
    idVenta?: number,
    numeroDocumento?: string,
    tipoPago: string,
    fechaRegistro?: string,
    totalTexto: string,
    detalleVenta: DetalleVenta[]
}
