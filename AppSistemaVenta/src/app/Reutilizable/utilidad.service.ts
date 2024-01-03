import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar'; // Se usa para mostrar mensajes emergentes
import { Sesion } from '../Interfaces/sesion';

@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor(private _snackBar: MatSnackBar) { }

  // Funcion para mostrar mensajes emergentes
  mostrarMensaje(mensaje:string, tipo:string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    })
  }

  guardarSesionUsuario(usuarioSession:Sesion) {
    // Permite guardar infromacion del usuario en memoria del navegador 
    localStorage.setItem("usuario", JSON.stringify(usuarioSession));
  }

  obtenerSesionUsuario(){
    
    const dataCadena = localStorage.getItem("usuario");

    const usuario = JSON.parse(dataCadena!); // Indica que no puede ser nulo
    return usuario;
  }

  eliminarSesionUsuario(){
    localStorage.removeItem("usuario");
  }

}
