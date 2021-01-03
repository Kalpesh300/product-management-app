import { GET_DELETED_PRODUCT_LIST_ENDPOINT, RESTORE_PRODUCT_ENDPOINT } from './../../../constants/api-endpoint.constants';
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


  deleteProduct(productId: string): Observable<Response<Product>> {

    const url = `${environment.apiEndPoint}/${GET_PRODUCT_LIST_ENDPOINT}/${productId}`;
    return this._apiCaller.putRequest<Product, null>(url, null);
  }


  getDeletedProducts(): Observable<Response<Product[]>> {

    const url = `${environment.apiEndPoint}/${GET_DELETED_PRODUCT_LIST_ENDPOINT}`;
    return this._apiCaller.getRequest<Product[]>(url);
  }


  restoreProduct(productId: string): Observable<Response<Product>> {

    const url = `${environment.apiEndPoint}/${RESTORE_PRODUCT_ENDPOINT}/${productId}`;
    return this._apiCaller.putRequest<Product, null>(url, null);
  }
}
