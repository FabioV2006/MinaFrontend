import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  HOST_API = 'http://localhost:8080/api/pacientes';
  
  constructor(private http: HttpClient) { }
  getPacientes() {
    return this.http.get<any[]>(this.HOST_API);
  }
  addPaciente(paciente: any) {
    return this.http.post<any>(this.HOST_API, paciente);
  }
  updatePaciente(paciente: any) {
    return this.http.put<any>(`${this.HOST_API}/${paciente.id}`, paciente);
  }
  deletePaciente(id: number) {
    return this.http.delete<void>(`${this.HOST_API}/${id}`);  

  }
}

