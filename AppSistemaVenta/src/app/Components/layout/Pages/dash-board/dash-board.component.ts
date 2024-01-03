import { Component, OnInit } from '@angular/core';

import { Chart, registerables } from 'chart.js';
import { DashBoardService } from 'src/app/Services/dash-board.service';
Chart.register(...registerables); // Import chart.js plugins


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit{

  totalIngresos: string="0";
  totalVentas: string="0";
  totalProductos: string="0";



  constructor(
    private _dashBoardService: DashBoardService
  ) { 

  }

  mostrarGrafico(labelGrafico: any[], dataGrafico: any[]){

    const chartBarras = new Chart('chartBarras', {
      type: 'bar',
      data: {
        labels: labelGrafico,
        datasets: [{
          label: '# de ventas',
          data: dataGrafico,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y:{
            beginAtZero: true // Inicio de la escala en 0
          }
        }
      }
    });

  }

  ngOnInit() {

    this._dashBoardService.resumen().subscribe({
      next: (data) => {
        if (data.status){
          this.totalIngresos = data.value.totalIngresos;
          this.totalVentas = data.value.totalVentas;
          this.totalProductos = data.value.totalProductos;

          const arrayData: any[] = data.value.ventasUltimaSemana;
          

          const labelTemp = arrayData.map((value) => value.fecha);
          const dataTemp = arrayData.map((value) => value.total);
          console.log(labelTemp, dataTemp);

          this.mostrarGrafico(labelTemp, dataTemp);

        } 
      },
      error: (err) => {
        console.log(err);
      }
      
    })

  }
}
