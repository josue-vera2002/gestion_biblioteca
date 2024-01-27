import { DevolucionService } from './../services/devolucion.service'; // Import the appropriate service
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Devolucion } from '../modelo/devolucion'; // Import the appropriate model
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-devolucion',
  templateUrl: './form-devolucion.component.html',
  styleUrls: ['./form-devolucion.component.css']
})
export class FormDevolucionComponent implements OnInit {
  formData: Devolucion = new Devolucion(); // Update to match the Devolucion model
  opcion: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<FormDevolucionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private devolucionService: DevolucionService, // Update to match the Devolucion service
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if (this.data.opciones == true) {
      this.opcion = true;
    } else {
      this.opcion = false;
      if (this.data && this.data.dev) {
        this.formData = { ...this.data.dev };
      }
    }

    this.mostrarOpcion(this.data.opciones);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  mostrarOpcion(op: boolean): void {
    console.log(op);
    this.opcion = op;
  }

  crearDevolucionform(devolucion: Devolucion): void {
    this.devolucionService.crearDevolucion(devolucion).subscribe(
      (respuesta) => {
        console.log('Crear devolución', respuesta);
        this.mostrarNotificacion('Acción realizada');
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error al guardar devolución', error);
      }
    );
  }

  actualizarDevolucionform(id: number, devolucion: Devolucion): void {
    this.devolucionService.actualizarDevolucion(id, devolucion).subscribe(
      (respuesta) => {
        console.log('Devolución actualizada exitosamente', respuesta);
        this.mostrarNotificacion('Acción exitosa');
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error al actualizar devolución', error);
      }
    );
  }

  private mostrarNotificacion(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000, // Duración en milisegundos (3 segundos en este ejemplo)
    });
  }
}
