// AdterViewInit sirve para cuando nuestro componente termina de renderizarse y ViewChild sirve para obtener un elemento del DOM
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Para trabajr con formularios reactivos
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment'; // Para trabajar con fechas

import { ModalDetalleVentaComponent } from '../../Modales/modal-detalle-venta/modal-detalle-venta.component';

import { Venta } from 'src/app/Interfaces/venta';
import { VentaService } from 'src/app/Services/venta.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';


export const MY_DATA_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dataInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
  }
}

@Component({
  selector: 'app-historial-venta',
  templateUrl: './historial-venta.component.html',
  styleUrls: ['./historial-venta.component.css'], 
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS}]
})
export class HistorialVentaComponent implements OnInit, AfterViewInit {

  formularioBusqueda: FormGroup;
  opcionesBusqueda: any[] = [
    {value: "fecha", descripcion: "Por fechas"},
    {value: "numero", descripcion: "Numero venta"}
  ]

  columnasTabla: string[] = ['fechaRegistro', 'numeroDocumento', 'tipoPago', 'total', 'acciones'];
  dataInicio: Venta[] = [];
  datosListaVentas = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator; // Sifix: ! significa que no es null ni undefined


  // Inyección de dependencias, significa que se puede usar el servicio dentro de esta clase
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _ventaService: VentaService,
    private _utilidadService: UtilidadService
  ) {
    this.formularioBusqueda = this.fb.group({
      buscarPor: ['fecha'],
      numero: [''],
      fechaInicio: [''],
      fechaFin: ['']
    })

    // Cada vez que cambie, limpiamos los campos
    this.formularioBusqueda.get('buscarPor')?.valueChanges.subscribe(value => {
      this.formularioBusqueda.patchValue({
        numero: "",
        fechaInicio: "",
        fechaFin: ""
      })
    })

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.datosListaVentas.paginator = this.paginacionTabla;
  }


  aplicarFiltroTabla(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.datosListaVentas.filter = filterValue.trim().toLocaleLowerCase();
  }


  buscarVentas(){
    let _fechaInicio: string = "";
    let _fechaFin: string = "";

    if (this.formularioBusqueda.value.buscarPor == "fecha") {
      _fechaInicio = moment(this.formularioBusqueda.value.fechaInicio).format("DD/MM/YYYY");
      _fechaFin = moment(this.formularioBusqueda.value.fechaFin).format("DD/MM/YYYY");
    }

    if (_fechaInicio === "Invalid date" || _fechaFin === "Invalid date") {
      this._utilidadService.mostrarMensaje("Las fechas no son válidas", "Oops!")
      return;
    }

    this._ventaService.historial(
      this.formularioBusqueda.value.buscarPor,
      this.formularioBusqueda.value.numero,
      _fechaInicio,
      _fechaFin
    ).subscribe({
      next: (data) => {

        if (data.status)
          this.datosListaVentas = data.value;
        else
          this._utilidadService.mostrarMensaje("No se encontraron datos", "Oops!")

      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  verDetalleVenta(_venta: Venta){
    this.dialog.open(ModalDetalleVentaComponent, { // Personalizar el modal
      data: _venta,
      disableClose: true,
      width: '700px'
    })
  }


}
