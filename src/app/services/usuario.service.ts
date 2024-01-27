import { Usuario } from '../modelo/usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseURL = 'http://localhost:8080/api/v1/usuarios';

  constructor(private httpClient: HttpClient) { }

  getListaUsuarios(): Observable<any[]> {
    console.log("dentro del servicio");
    return this.httpClient.get<any[]>(this.baseURL);
  }
  getUsuarioPorId(id: number):Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.baseURL}/${id}`);
  }

  crearUsuario(usuario: Usuario):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,usuario);
  }

  actualizarUsuario(id:number, usuario:Usuario): Observable<object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
  
}
