import { Component, OnInit,Inject } from '@angular/core';
import { Prestamos } from '../modelo/prestamos';
import { PrestamoService } from '../services/prestamos.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from './../services/usuario.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../modelo/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prestamos',
  templateUrl: './form-prestamos.component.html',
  styleUrls: ['./form-prestamos.component.css']
})
export class FormPrestamosComponent implements OnInit {
  formData: Prestamos = new Prestamos();
  opcion: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<FormPrestamosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private prestamoService: PrestamoService,
    private snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {
    // Verifica si se proporcionaron datos al diálogo y si hay un usuario definido
    if (this.data.opciones==true){

      this.opcion=true;
    }else{
      this.opcion=false;
      if (this.data && this.data.prestamo) {
        this.formData = { ...this.data.prestamo };
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

  crearPrestamoform(prestamo:Prestamos):void {
    this.prestamoService.crearPrestamo(prestamo).subscribe(
      (respuesta) => {
        console.log('crear prestamos', respuesta);
        this.mostrarNotificacion('opccion realizada');
        this.dialogRef.close();
      },
        (error) => {
          console.error('Error al guardar prestamo', error);
        }
      );
    }
  actualizarPrestamoform(id: number, prestamo: Prestamos): void {
    this.prestamoService.actualizarPrestamo(id, prestamo).subscribe(
      (respuesta) => {
        console.log('Prestamo actualizado exitosamente', respuesta);
        this.mostrarNotificacion('Acción exitosa');
        this.dialogRef.close();
        // Puedes realizar otras acciones después de la actualización si es necesario
      },
      (error) => {
        console.error('Error al actualizar Prestamos', error);
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
