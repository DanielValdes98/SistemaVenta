// AdterViewInit sirve para cuando nuestro componente termina de renderizarse y ViewChild sirve para obtener un elemento del DOM
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalUsuarioComponent } from '../../Modales/modal-usuario/modal-usuario.component';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2'; // Permite mostrar alertas tipo pop-up personalizables


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, AfterViewInit {

  columnasTabla: string[] = ['nombreCompleto', 'correo', 'rolDescripcion', 'estado', 'acciones'];
  dataInicio: Usuario[] = [];
  dataListaUsuarios = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator; // Sifix: ! significa que no es null ni undefined

  constructor(
    private dialog: MatDialog,
    private _usuarioService: UsuarioService,
    private _utilidadService: UtilidadService
  ) {}

  obtenerUsuarios() {
    this._usuarioService.lista().subscribe({
      next: (data) => {
        if(data.status)
          this.dataListaUsuarios.data = data.value;
        else
          this._utilidadService.mostrarMensaje("No se encontraron datos", "Oops!")
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  
  ngAfterViewInit(): void {
    this.dataListaUsuarios.paginator = this.paginacionTabla;
  }


  aplicarFiltroTabla(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaUsuarios.filter = filterValue.trim().toLocaleLowerCase();
  }

  nuevoUsuario(){
    this.dialog.open(ModalUsuarioComponent, {
      disableClose: true // Evita que se cierre el modal al dar click fuera de él
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true") this.obtenerUsuarios();
    });
  }


  editarUsuario(usuario: Usuario){
    this.dialog.open(ModalUsuarioComponent, {
      disableClose: true, // Evita que se cierre el modal al dar click fuera de él
      data: usuario
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true") this.obtenerUsuarios();
    });
  }

  eliminarUsuario(usuario: Usuario){
    Swal.fire({
      title: '¿Desea eliminar el usuario?',
      text: usuario.nombreCompleto, 
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {

      if(resultado.isConfirmed){
        this._usuarioService.eliminar(usuario.idUsuario).subscribe({
          next:(data) => {

            if(data.status){
              this._utilidadService.mostrarMensaje("El usuario fue eliminado", "Exito");
              this.obtenerUsuarios();
            } else
              this._utilidadService.mostrarMensaje("No se pudo eliminar el usuario", "Error");
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    })
  }

}
