import { Libros } from './../modelo/libros';
import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../services/libros.service';
import { MatDialog } from '@angular/material/dialog';
import { FormLibroComponent } from '../form-libros/form-libros.component';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {
  libros: Libros[] = [];
  opciones: boolean = false;

  constructor(
    private libroService: LibrosService,
    public dialog: MatDialog
  ) {}

  openDialog(opcion: boolean, libro?: Libros): void {
    const dialogRef = this.dialog.open(FormLibroComponent, {
      width: '500px',
      data: { libro: libro, opciones: opcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró con el resultado:', result);
    });
  }

  eliminarLibro(id: number): void {
    // Lógica para eliminar el libro con el id proporcionado
    this.libroService.eliminarLibros(id).subscribe(
      () => {
        // Eliminación exitosa, actualiza la lista de libros
        this.actualizarListaLibros();
      },
      error => {
        console.error('Error al eliminar el libro', error);
      }
    );
  }

  private actualizarListaLibros(): void {
    // Actualiza la lista de libros después de una operación exitosa
    this.libroService.getList().subscribe(
      (datos: Libros[]) => {
        this.libros = datos;
      },
      error => {
        console.error('Error al obtener la lista de libros', error);
      }
    );
  }

  ngOnInit(): void {
    this.libroService.getList().subscribe(
      (datos: Libros[]) => {
        this.libros = datos;
      },
      error => {
        console.error(error);
      }
    );
  }
}
