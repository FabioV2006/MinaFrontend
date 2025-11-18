import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Definición de la entidad Mina
export interface Mina {
  id: number;
  codigo: string;
  nombre: string;
  fechaInicioOperacion: string;
  tipo: 'Tajo Abierto' | 'Subterránea' | 'Mixta'; // C01 - Punto 3
  toneladasProducidas?: number; // C01 - No obligatorio
}

@Injectable({
  providedIn: 'root'
})
export class MinaService {
  HOST_API = 'http://localhost:8080/api/minas'; // Endpoint de la nueva entidad

  constructor(private http: HttpClient) { }

  getMinas() {
    return this.http.get<Mina[]>(this.HOST_API);
  }

  // Usamos Omit<Mina, 'id'> para el registro, ya que la ID la genera el backend
  addMina(mina: Omit<Mina, 'id'>) {
    return this.http.post<Mina>(this.HOST_API, mina);
  }
}
