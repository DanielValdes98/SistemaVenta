import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Para usar formularios reactivos
import { HttpClientModule } from '@angular/common/http'; // Para hacer peticiones HTTP

// Componentes de Angular Material
import { MatCardModule } from '@angular/material/card'; // Para usar el componente de tarjeta
import { MatInputModule } from '@angular/material/input'; // Para usar el componente de input
import { MatSelectModule } from '@angular/material/select'; // Para usar el componente de select
import { MatProgressBarModule } from '@angular/material/progress-bar'; // Para usar el componente de barra de progreso
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Para usar el componente de spinner, loading
import { MatGridListModule } from '@angular/material/grid-list'; // Para usar el componente de grid

// Componentes de Angular Material Layout: Se van a trabajar para los menus
import { LayoutModule } from '@angular/cdk/layout'; // Para usar el componente de layout
import { MatToolbarModule } from '@angular/material/toolbar'; // Para usar el componente de toolbar y complementar el layout
import { MatSidenavModule } from '@angular/material/sidenav'; // Para usar el componente de sidenav
import { MatButtonModule } from '@angular/material/button'; // Para usar el componente de button
import { MatIconModule } from '@angular/material/icon'; // Para usar el componente de iconos de Angular
import { MatListModule } from '@angular/material/list'; // Para usar el componente de listas

import { MatTableModule } from '@angular/material/table'; // Para usar el componente de tabla de angular, como data tables
import { MatPaginatorModule } from '@angular/material/paginator'; // Para usar el componente de paginacion de angular
import { MatDialogModule } from '@angular/material/dialog'; // Para usar el componente de dialogo de angular, modales
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Para usar las alertas de angular
import { MatTooltipModule } from '@angular/material/tooltip'; // Para usar el componente de tooltip de angular
import { MatAutocompleteModule } from '@angular/material/autocomplete'; // Para usar el componente de autocompletar de angular
import { MatDatepickerModule } from '@angular/material/datepicker'; // Para usar el componente de datepicker para seleccionar fechas

import { MatNativeDateModule } from '@angular/material/core'; // Para las fechas nativas de angular
import { MatMomentDateModule } from '@angular/material-moment-adapter'; // Permite cambiar el formato de las fechas
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatFormFieldModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class SharedModule { }
