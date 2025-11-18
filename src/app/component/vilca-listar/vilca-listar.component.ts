import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Mina, MinaService } from '../../services/mina.service';

@Component({
  selector: 'app-vilca-listar', // C06: Prefijo "vilca"
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
  templateUrl: './vilca-listar.component.html',
  styleUrl: './vilca-listar.component.css'
})
export class VilcaListarComponent implements OnInit { // Export class para evitar TS2305
  // Mostrar solo 3 atributos de la entidad Mina: Código, Nombre, Tipo (C02 - Punto 2)
  displayedColumns: string[] = ['codigo', 'nombre', 'tipo'];
  dataSource = new MatTableDataSource<Mina>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private minaService: MinaService, private router: Router) { }

  ngOnInit(): void {
    this.minaService.getMinas().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error('Error al obtener minas', err)
    });
  }

  aplicarFiltro(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  irANuevoRegistro() {
    // Redirigir a la ruta de registro /vilca/nuevo (C03 - Punto 4)
    this.router.navigate(['/vilca/nuevo']);
  }
}
