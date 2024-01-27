import { Component, OnInit } from '@angular/core';
import { DevolucionService } from '../services/devolucion.service'; // Make sure to import the correct service
import { Devolucion } from '../modelo/devolucion'; // Make sure to import the correct model
import { RouterModule, Router } from '@angular/router';
import { FormDevolucionComponent } from '../form-devolucion/form-devolucion.component'; // Make sure to import the correct component

import {
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.component.html',
  styleUrls: ['./devolucion.component.css']
})
export class DevolucionComponent implements OnInit {
  devoluciones: Devolucion[] = [];
  opciones: boolean = false;

  constructor(
    private devolucionService: DevolucionService, // Make sure to inject the correct service
    private router: Router,
    public dialog: MatDialog
  ) {}

  openDialog(opcion: boolean, devolucion?: Devolucion): void {
    const dialogRef = this.dialog.open(FormDevolucionComponent, {
      width: '500px',
      data: { dev: devolucion, opciones: opcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró con el resultado:', result);
    });
  }

  ngOnInit(): void {
    this.devolucionService.getListaDevoluciones().subscribe(
      datos => {
        this.devoluciones = datos;
        console.log(this.devoluciones);
        console.log("holwtf");
      },
      error => {
        console.error(error);
      }
    );
  }

  eliminarDevolucion(id: number) {
    console.log(id);
    this.devolucionService.eliminarDevolucion(id).subscribe(
      datos => {
        console.log(datos);
        this.getDevoluciones();
      },
      error => console.log(error)
    );
  }

  private getDevoluciones() {
    this.devolucionService.getListaDevoluciones().subscribe(
      datos => {
        this.devoluciones = datos;
        console.log(this.devoluciones);
      },
      error => {
        console.error(error);
      }
    );
  }
}
