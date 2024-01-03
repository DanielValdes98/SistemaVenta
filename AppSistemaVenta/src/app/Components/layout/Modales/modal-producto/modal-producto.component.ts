import { Component, OnInit, Inject } from '@angular/core'; // Inject para poder usar el modal y recibir cualquier dato desde otro componente

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Categoria } from 'src/app/Interfaces/categoria';
import { Producto } from 'src/app/Interfaces/producto';
import { CategoriaService } from 'src/app/Services/categoria.service'; // Para obtener la lista de categorias
import { ProductoService } from 'src/app/Services/producto.service'; // Para guardar el producto
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service'; // Para mostrar mensajes de error, etc


@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css']
})
export class ModalProductoComponent implements OnInit{

  formularioProducto: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  listaCategorias: Categoria[] = [];


  constructor(
    // Inyección de dependencias, significa que se puede usar el servicio dentro de esta clase
    private modalActual: MatDialogRef<ModalProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosProducto: Producto, // Datos que se reciben desde otro componente
    private fb: FormBuilder,
    private _categoriaService: CategoriaService,
    private _productoService: ProductoService,
    private _utilidadService: UtilidadService
  ){

    this.formularioProducto = this.fb.group({
      nombre: ['', Validators.required],
      idCategoria: ['', Validators.required],
      stock: ['', Validators.required],
      precio: ['', Validators.required],
      esActivo: ['1', Validators.required]
    });

    // Validacion si en realidad se reciben datos del producto
    if (this.datosProducto != null){
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }

    this._categoriaService.lista().subscribe({
      next: (data) => {
        if (data.status) this.listaCategorias = data.value
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  ngOnInit(): void {

    // Si tenemos datos del producto, entonces los mostramos en el formulario (setear)
    if(this.datosProducto != null){
      this.formularioProducto.patchValue({

        nombre: this.datosProducto.nombre,
        idCategoria: this.datosProducto.idCategoria,
        stock: this.datosProducto.stock,
        precio: this.datosProducto.precio,
        esActivo: this.datosProducto.esActivo.toString()
      });
    }

  }

  guardarEditar_Producto() {

    const _producto: Producto = { 
    idProducto: this.datosProducto == null ? 0 : this.datosProducto.idProducto,
    nombre: this.formularioProducto.value.nombre,
    idCategoria: this.formularioProducto.value.idCategoria,
    descripcionCategoria: "",
    precio: this.formularioProducto.value.precio,
    stock: this.formularioProducto.value.stock,
    esActivo: parseInt(this.formularioProducto.value.esActivo)
    }

    if (this.datosProducto == null) {
      this._productoService.guardar(_producto).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadService.mostrarMensaje("El producto fue registrado", "Exito");
            this.modalActual.close("true");
          } else 
            this._utilidadService.mostrarMensaje("El producto no fue registrado", "Error");
        },
        error: (err) => {
          console.log(err);
        }
      })

    } else {
      this._productoService.editar(_producto).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadService.mostrarMensaje("El producto fue editado", "Exito");
            this.modalActual.close("true");
          } else 
            this._utilidadService.mostrarMensaje("El producto no fue editado", "Error");
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }



}
