// AdterViewInit sirve para cuando nuestro componente termina de renderizarse y ViewChild sirve para obtener un elemento del DOM
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Para trabajr con formularios reactivos
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment'; // Para trabajar con fechas

import * as XLSX from 'xlsx'; // Para exportar a excel

import { Reporte } from 'src/app/Interfaces/reporte';
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
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS}]
})
export class ReporteComponent implements OnInit {

  formularioFiltro: FormGroup;
  listaVentasReporte: Reporte[] = [];
  columnasTabla: string[] = ['fechaRegistro', 'numeroVenta', 'tipoPago', 'total', 'producto', 'cantidad', 'precio', 'totalProducto'];
  dataVentaReporte = new MatTableDataSource(this.listaVentasReporte);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator; // Sifix: ! significa que no es null ni undefined

  // Inyección de dependencias, significa que se puede usar el servicio dentro de esta clase
  constructor(
    private fb: FormBuilder,
    private _ventaService: VentaService,
    private _utilidadService: UtilidadService
  ) {
    this.formularioFiltro = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  } 

  ngAfterViewInit(): void {
    this.dataVentaReporte.paginator = this.paginacionTabla;
  }

  buscarVentas() {
    const _fechaInicio = moment(this.formularioFiltro.value.fechaInicio).format("DD/MM/YYYY");
    const _fechaFin = moment(this.formularioFiltro.value.fechaFin).format("DD/MM/YYYY");

    if (_fechaInicio === "Invalid date" || _fechaFin === "Invalid date") {
      this._utilidadService.mostrarMensaje("Las fechas no son válidas", "Oops!")
      return;
    }

    this._ventaService.reporte(_fechaInicio, _fechaFin).subscribe({
      next: (data) => {

        if (data.status){
          this.listaVentasReporte = data.value;
          this.dataVentaReporte.data = this.listaVentasReporte;
        } else {
          this.listaVentasReporte = [];
          this.dataVentaReporte.data = [];
          this._utilidadService.mostrarMensaje("No se encontraron datos", "Oops!")
        }

      },
      error: (err) => { console.log(err) },
    })

  }

  exportarExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(this.listaVentasReporte);

    XLSX.utils.book_append_sheet(wb, ws, 'Reporte');
    XLSX.writeFile(wb, 'Reporte Ventas.xlsx');
  }

}
