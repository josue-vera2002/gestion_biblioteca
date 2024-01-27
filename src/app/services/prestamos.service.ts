import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { Prestamos } from '../modelo/prestamos';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService implements OnDestroy {
  private baseURL = 'http://localhost:8080/api/v1/prestamos'; // Cambia la URL según tu API de préstamos
  private destroy$ = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  getListaPrestamos(): Observable<any[]> {
    console.log("dentro del servicio de préstamos");
    return this.httpClient.get<any[]>(this.baseURL)
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud de obtener la lista de préstamos:', error);
          throw error;  // Reenviar el error para que el componente también pueda manejarlo
        }),
        takeUntil(this.destroy$)
      );
  }

  getPrestamoPorId(id: number): Observable<Prestamos> {
    return this.httpClient.get<Prestamos>(`${this.baseURL}/${id}`);
  }

  crearPrestamo(prestamo: Prestamos): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, prestamo);
  }

  actualizarPrestamo(id: number, prestamo: Prestamos): Observable<object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, prestamo)
      .pipe(takeUntil(this.destroy$));
  }

  eliminarPrestamo(id: number): Observable<object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`)
      .pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
