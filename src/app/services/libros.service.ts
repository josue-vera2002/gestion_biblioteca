import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libros } from '../modelo/libros';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private baseURL = 'http://localhost:8080/api/v1/libros';

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<Libros[]> {
    const url = `${this.baseURL}`; // Utiliza this.baseURL en lugar de this.apiUrl
    return this.httpClient.get<Libros[]>(url);
  }

  getListaLibros(): Observable<any[]> {
    console.log("dentro del servicio");
    return this.httpClient.get<any[]>(this.baseURL);
  }

  getLibrosPorId(id: number): Observable<Libros> {
    return this.httpClient.get<Libros>(`${this.baseURL}/${id}`);
  }

  crearLibros(libros: Libros): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, libros);
  }

  actualizarLibros(id: number, libros: Libros): Observable<object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, libros);
  }

  eliminarLibros(id: number): Observable<object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
