export interface producto {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  stock: number;
  precio: number;
  images?: string[];
}
