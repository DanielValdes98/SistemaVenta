import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'; // Requerido para hacer peticiones HTTP
import { Observable } from 'rxjs'; // Para recibir las respuestas de las API
import { environment } from 'src/environments/environment.development'; // Donde se guardan las variables de entorno
import { ResponseApi } from '../Interfaces/response-api'; // Interfaz para recibir la respuesta de la API
import { Rol } from '../Interfaces/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private urlApi: string = environment.endpoint + "Rol/";

  constructor(private http: HttpClient) { }

  lista(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}Lista`);
  }


}
