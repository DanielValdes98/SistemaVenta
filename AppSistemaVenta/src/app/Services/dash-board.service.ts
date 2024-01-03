import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'; // Requerido para hacer peticiones HTTP
import { Observable } from 'rxjs'; // Para recibir las respuestas de las API
import { environment } from 'src/environments/environment.development'; // Donde se guardan las variables de entorno
import { ResponseApi } from '../Interfaces/response-api'; // Interfaz para recibir la respuesta de la API

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  private urlApi: string = environment.endpoint + "DashBoard/";

  constructor(private http: HttpClient) { }

  resumen(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}Resumen`);
  }

}
