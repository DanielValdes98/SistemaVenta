// AdterViewInit sirve para cuando nuestro componente termina de renderizarse y ViewChild sirve para obtener un elemento del DOM
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalProductoComponent } from '../../Modales/modal-producto/modal-producto.component';
import { Producto } from 'src/app/Interfaces/producto';
import { ProductoService } from 'src/app/Services/producto.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2'; // Permite mostrar alertas tipo pop-up personalizables


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit, AfterViewInit {

  columnasTabla: string[] = ['nombre', 'descripcionCategoria', 'stock', 'precio', 'estado', 'acciones'];
  dataInicio: Producto[] = [];
  dataListaProductos = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator; // Sifix: ! significa que no es null ni undefined


  constructor(
    private dialog: MatDialog,
    private _productoService: ProductoService,
    private _utilidadService: UtilidadService
  ) { }

  obtenerProductos() {
    this._productoService.lista().subscribe({
      next: (data) => {
        if(data.status)
          this.dataListaProductos.data = data.value;
        else
          this._utilidadService.mostrarMensaje("No se encontraron datos", "Oops!")
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  ngAfterViewInit(): void {
    this.dataListaProductos.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaProductos.filter = filterValue.trim().toLocaleLowerCase();
  }

  nuevoProducto(){
    this.dialog.open(ModalProductoComponent, {
      disableClose: true // Evita que se cierre el modal al dar click fuera de él
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true") this.obtenerProductos();
    });
  }

  editarProducto(producto: Producto){
    this.dialog.open(ModalProductoComponent, {
      disableClose: true, // Evita que se cierre el modal al dar click fuera de él
      data: producto
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true") this.obtenerProductos();
    });
  }

  eliminarProducto(producto: Producto){
    Swal.fire({
      title: '¿Desea eliminar el producto?',
      text: producto.nombre, 
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {

      if(resultado.isConfirmed){
        this._productoService.eliminar(producto.idProducto).subscribe({
          next:(data) => {

            if(data.status){
              this._utilidadService.mostrarMensaje("El producto fue eliminado", "Exito");
              this.obtenerProductos();
            } else
              this._utilidadService.mostrarMensaje("No se pudo eliminar el producto", "Error");
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    })
  }


}
