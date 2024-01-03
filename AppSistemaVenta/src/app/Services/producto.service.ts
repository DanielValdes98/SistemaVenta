import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'; // Requerido para hacer peticiones HTTP
import { Observable } from 'rxjs'; // Para recibir las respuestas de las API
import { environment } from 'src/environments/environment.development'; // Donde se guardan las variables de entorno
import { ResponseApi } from '../Interfaces/response-api'; // Interfaz para recibir la respuesta de la API
import { Producto } from '../Interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlApi: string = environment.endpoint + "Producto/";

  constructor(private http: HttpClient) { }

  lista(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}Lista`);
  }

  guardar(request: Producto): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}Guardar`, request);
  }

  editar(request: Producto): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}Editar`, request);
  }

  eliminar(id: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.urlApi}Eliminar/${id}`);
  }

}
