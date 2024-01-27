import { UsuarioService } from './../services/usuario.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../modelo/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {
  formData: Usuario = new Usuario();
  opcion: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<FormUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {
    // Verifica si se proporcionaron datos al diálogo y si hay un usuario definido
    if (this.data.opciones==true){

      this.opcion=true;
    }else{
      this.opcion=false;
      if (this.data && this.data.usuario) {
        this.formData = { ...this.data.usuario };
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

  crearUsuarioform(usuario:Usuario):void {
    this.usuarioService.crearUsuario(usuario).subscribe(
      (respuesta) => {
        console.log('crear usuario', respuesta);
        this.mostrarNotificacion('opccion realizada');
        this.dialogRef.close();
      },
        (error) => {
          console.error('Error al guardar usuario', error);
        }
      );
    }
  actualizarUsuarioform(id: number, usuario: Usuario): void {
    this.usuarioService.actualizarUsuario(id, usuario).subscribe(
      (respuesta) => {
        console.log('Usuario actualizado exitosamente', respuesta);
        this.mostrarNotificacion('Acción exitosa');
        this.dialogRef.close();
        // Puedes realizar otras acciones después de la actualización si es necesario
      },
      (error) => {
        console.error('Error al actualizar usuario', error);
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

