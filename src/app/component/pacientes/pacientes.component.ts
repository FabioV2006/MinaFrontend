import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PacienteService } from '../../services/paciente.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

export interface Paciente {
  id: number;
  nombre: string;
  genero: string;
  fechaNacimiento: string;
  diagnostico: string;
}


@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'genero', 'fechaNacimiento', 'diagnostico'];
  dataSource = new MatTableDataSource<Paciente>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pacienteService: PacienteService, private router: Router) { }

  ngOnInit(): void {
    this.pacienteService.getPacientes().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error('Error al obtener pacientes', err)
    });
  }
aplicarFiltro(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }
  irARegistro() {
    this.router.navigate(['/registro']);
  }

}
