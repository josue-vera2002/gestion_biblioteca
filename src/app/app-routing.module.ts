import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario/usuario.component';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { LibrosComponent } from './libros/libros.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { DevolucionComponent } from './devolucion/devolucion.component';
const routes: Routes = [
 // { path: '', component: AppComponent }, 
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'libros', component: LibrosComponent },
  { path: 'prestamos', component: PrestamosComponent },
  { path: 'devoluciones', component: DevolucionComponent},


];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }




