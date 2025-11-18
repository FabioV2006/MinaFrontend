import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-registro',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule

  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
   form;

  constructor(private fb: FormBuilder, private pacienteService: PacienteService, private router: Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      genero: ['', Validators.required, Validators.minLength(5)],
      fechaNacimiento: [''],
      diagnostico: ['', Validators.required]
    });
  }

  guardar() {
    if (this.form.valid) {
      const { nombre, genero, fechaNacimiento, diagnostico } = this.form.value;
      const nuevo = {
        nombre: nombre ?? '',
        genero: genero ?? '',
        fechaNacimiento: fechaNacimiento ?? '',
        diagnostico: diagnostico ?? '',
        fechaRegistro: new Date().toISOString()
      };
      this.pacienteService.addPaciente(nuevo).subscribe(() => {
        alert('Paciente registrado correctamente');
        this.router.navigate(['/listado']);
      });
    }
  }

  salir() {
    this.router.navigate(['/pacientes']);
  }
}

    

