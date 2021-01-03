import { ProductFormValue } from './../../../interfaces/product.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiCallerService } from 'src/app/core/services/api-caller.service';
import { Product } from 'src/app/interfaces/product.interface';
import { environment } from 'src/environments/environment';
import { GET_PRODUCT_LIST_ENDPOINT } from 'src/app/constants/api-endpoint.constants';
import { Response } from 'src/app/interfaces/response.interface';

@Injectable()
export class ProductService {


  constructor(
    private _apiCaller: ApiCallerService,
  ) { }


  getProductList(): Observable<Response<Product[]>> {

    const url = `${environment.apiEndPoint}/${GET_PRODUCT_LIST_ENDPOINT}`;
    return this._apiCaller.getRequest<Product[]>(url);
  }


  getProductById(productId: string): Observable<Response<Product>> {
    const url = `${environment.apiEndPoint}/${GET_PRODUCT_LIST_ENDPOINT}/${productId}`;
    return this._apiCaller.getRequest<Product>(url);
  }


  addProduct(productData: ProductFormValue): Observable<Response<Product>> {

    const url = `${environment.apiEndPoint}/${GET_PRODUCT_LIST_ENDPOINT}`;
    return this._apiCaller.postRequest<Product, ProductFormValue>(url, productData);
  }
}
