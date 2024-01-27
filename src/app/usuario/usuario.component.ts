import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../modelo/usuario';
import { RouterModule , Router } from '@angular/router';
import { FormUsuarioComponent } from '../form-usuario/form-usuario.component';


import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  opciones:boolean=false;
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  
  openDialog(opcion:boolean ,usuario?: Usuario): void {
    const dialogRef = this.dialog.open(FormUsuarioComponent, {
      width: '500px',
      data: { usuario: usuario, opciones:opcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró con el resultado:', result);
    });
  }

  ngOnInit(): void { 
    this.usuarioService.getListaUsuarios().subscribe(
      datos => {
        this.usuarios = datos;
        console.log(this.usuarios);
      },
      error => {
        console.error(error);
      }
    );
  }

  

  eliminarUsuario(id: number) {
    console.log(id);
    this.usuarioService.eliminarUsuario(id).subscribe(
      datos => {
        console.log(datos);
        this.getUsuarios();
      },
      error => console.log(error)
    );
  }


  private getUsuarios() {
    this.usuarioService.getListaUsuarios().subscribe(
      datos => {
        this.usuarios = datos;
        console.log(this.usuarios);
      },
      error => {
        console.error(error);
      }
    );
  }

  
}







