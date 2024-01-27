import { Component, OnInit } from '@angular/core';
import { Prestamos } from '../modelo/prestamos';
import { PrestamoService } from '../services/prestamos.service';
import { MatDialog } from '@angular/material/dialog';
import { FormPrestamosComponent } from '../form-prestamos/form-prestamos.component';
@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {
  prestamos: Prestamos[] = [];
  opciones: boolean = false;

  constructor(
    private prestamoService: PrestamoService,
    public dialog: MatDialog
  ) {}

  openDialog(opcion: boolean, prestamo?: Prestamos): void {
    const dialogRef = this.dialog.open(FormPrestamosComponent, {
      width: '500px',
      data: { prestamo: prestamo, opciones: opcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró con el resultado:', result);
    });
  }

  eliminarPrestamo(id: number): void {
    // Lógica para eliminar el préstamo con el id proporcionado
    this.prestamoService.eliminarPrestamo(id).subscribe(
      () => {
        // Eliminación exitosa, actualiza la lista de préstamos
        this.actualizarListaPrestamos();
      },
      error => {
        console.error('Error al eliminar el préstamo', error);
      }
    );
  }

  private actualizarListaPrestamos(): void {
    // Actualiza la lista de préstamos después de una operación exitosa
    this.prestamoService.getListaPrestamos().subscribe(
      (datos: Prestamos[]) => {
        this.prestamos = datos;
      },
      error => {
        console.error('Error al obtener la lista de préstamos', error);
      }
    );
  }

  ngOnInit(): void {
    this.prestamoService.getListaPrestamos().subscribe(
      (datos: Prestamos[]) => {
        this.prestamos = datos;
      },
      error => {
        console.error(error);
      }
    );
  }
}
