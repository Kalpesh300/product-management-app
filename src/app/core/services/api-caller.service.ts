import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from 'src/app/interfaces/response.interface';

@Injectable()
export class ApiCallerService {


  constructor(
    private httpClient: HttpClient,
  ) { }


  getRequest<PayloadType>(url: string): Observable<Response<PayloadType>> {
    return this.httpClient.get<Response<PayloadType>>(url);
  }


  postRequest<PayloadType, DataType>(
    url: string, data: DataType,
  ): Observable<Response<PayloadType>> {
    return this.httpClient.post<Response<PayloadType>>(url, data);
  }


  putRequest<PayloadType, DataType>(
    url: string, data: DataType,
  ): Observable<Response<PayloadType>> {
    return this.httpClient.put<Response<PayloadType>>(url, data);
  }


  deleteRequest<PayloadType>(url: string): Observable<Response<PayloadType>> {
    return this.httpClient.delete<Response<PayloadType>>(url);
  }
}
