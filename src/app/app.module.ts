import { PrestamosComponent } from './prestamos/prestamos.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LibrosComponent } from './libros/libros.component';
import { DevolucionComponent } from './devolucion/devolucion.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormLibroComponent } from './form-libros/form-libros.component';
import { FormPrestamosComponent } from './form-prestamos/form-prestamos.component';
import { FormDevolucionComponent } from './form-devolucion/form-devolucion.component';
@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    LibrosComponent,
    DevolucionComponent,
    PrestamosComponent,
    FormUsuarioComponent,
    FormLibroComponent,
    FormPrestamosComponent,
    FormDevolucionComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NoopAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
