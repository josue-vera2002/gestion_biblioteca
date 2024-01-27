import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Libros } from '../modelo/libros';
import { LibrosService } from '../services/libros.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-libros',
  templateUrl: './form-libros.component.html',
  styleUrls: ['./form-libros.component.css']
})
export class FormLibroComponent implements OnInit {
  formData: Libros = new Libros(); // Asegúrate de tener el modelo correcto para libros
  opcion: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<FormLibroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private libroService: LibrosService, // Asegúrate de tener el servicio correcto para libros
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if (this.data.opciones == true) {
      this.opcion = true;
    } else {
      this.opcion = false;
      if (this.data && this.data.libro) {
        this.formData = { ...this.data.libro };
      }
    }
    this.mostrarOpcion(this.data.opciones);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  mostrarOpcion(op: boolean): void {
    console.log(op);
    if (op == true) {
      this.opcion = true;
    } else {
      this.opcion = false;
    }
  }

  crearLibroForm(libros: Libros): void {
    this.libroService.crearLibros(libros).subscribe(
      (respuesta) => {
        console.log('Libro creado', respuesta);
        this.mostrarNotificacion('Acción exitosa');
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error al guardar libro', error);
        // Puedes manejar el error de acuerdo a tus necesidades
      }
    );
  }

  actualizarLibroForm(id: number, libros: Libros): void {
    this.libroService.actualizarLibros(id, libros).subscribe(
      (respuesta) => {
        console.log('Libro actualizado exitosamente', respuesta);
        this.mostrarNotificacion('Acción exitosa');
        this.dialogRef.close();
        // Puedes realizar otras acciones después de la actualización si es necesario
      },
      (error) => {
        console.error('Error al actualizar libro', error);
        // Puedes manejar el error de acuerdo a tus necesidades
      }
    );
  }

  private mostrarNotificacion(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000, // Duración en milisegundos (3 segundos en este ejemplo)
    });
  }
  
}
