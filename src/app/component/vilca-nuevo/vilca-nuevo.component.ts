import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MinaService } from '../../services/mina.service';

@Component({
  selector: 'app-vilca-nuevo', // Prefijo "vilca"
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './vilca-nuevo.component.html',
  styleUrl: './vilca-nuevo.component.css'
})
export class VilcaNuevoComponent implements OnInit { // Clase exportada (soluciona TS2305)
  tiposMina = ['Tajo Abierto', 'Subterránea', 'Mixta']; // C01 - Punto 3
  form;

  constructor(private fb: FormBuilder, private minaService: MinaService, private router: Router) {
    this.form = this.fb.group({
      // Campos obligatorios (C01 - Punto 2)
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      fechaInicioOperacion: ['', Validators.required],
      tipo: ['', Validators.required],

      // Campo opcional (C01 - Punto 2)
      toneladasProducidas: ['']
    });
  }

  ngOnInit(): void {}

  guardar() {
    if (this.form.valid) {
      const formValue = this.form.value;

      // La validación garantiza que formValue.fechaInicioOperacion es un string (o Date object).
      // Si se usa input type="date", es un string 'YYYY-MM-DD'.
      const dateValue = formValue.fechaInicioOperacion as string | Date;

      let fechaISO: string;

      if (dateValue instanceof Date) {
        // Si el valor es un objeto Date (por algún DateAdapter de Angular Material)
        fechaISO = dateValue.toISOString().split('T')[0];
      } else if (typeof dateValue === 'string') {
        // Si el valor es un string 'YYYY-MM-DD' (típico de input type="date")
        fechaISO = dateValue;
      } else {
        // Esto no debería pasar con form.valid, pero se añade por seguridad de tipos
        fechaISO = '';
      }

      // Construir el objeto, usando 'as' para afirmar que los tipos obligatorios están presentes.
      const nuevaMina = {
        codigo: formValue.codigo as string,
        nombre: formValue.nombre as string,
        fechaInicioOperacion: fechaISO,
        tipo: formValue.tipo as 'Tajo Abierto' | 'Subterránea' | 'Mixta',

        // Manejamos toneladasProducidas, que es opcional:
        toneladasProducidas: formValue.toneladasProducidas ? Number(formValue.toneladasProducidas) : undefined,
      };

      this.minaService.addMina(nuevaMina as any).subscribe(() => {
        alert('Mina registrada correctamente');
        // Redirecciona al mismo formulario reseteado (C01 - Punto 5)
        this.form.reset();
      }, (error) => {
        console.error('Error al registrar la mina', error);
        alert('Error al registrar la mina');
      });
    }
  }
}
