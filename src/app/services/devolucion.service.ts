import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Devolucion } from '../modelo/devolucion';

@Injectable({
  providedIn: 'root'
})
export class DevolucionService {

  private baseURL = 'http://localhost:8080/api/v1/devolucion';

  constructor(private httpClient: HttpClient) { }

  getListaDevoluciones(): Observable<Devolucion[]> {
    return this.httpClient.get<Devolucion[]>(this.baseURL);
  }

  getDevolucionPorId(id: number): Observable<Devolucion> {
    return this.httpClient.get<Devolucion>(`${this.baseURL}/${id}`);
  }

  crearDevolucion(devolucion: Devolucion): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, devolucion);
  }

  actualizarDevolucion(id: number, devolucion: Devolucion): Observable<object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, devolucion);
  }

  eliminarDevolucion(id: number): Observable<object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
