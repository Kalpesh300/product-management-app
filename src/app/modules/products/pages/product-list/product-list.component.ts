import { SEARCH_QUERY_PARAMETER } from './../../../../constants/route.constants';
import { Product } from 'src/app/interfaces/product.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ActivatedRoute } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

@AutoUnsubscribe({
  arrayName: 'subscriptions'
})
@Component({
  selector: 'pma-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[];
  filteredProducts: Product[];

  private _products: Product[];


  constructor(
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.filteredProducts = [];
    this.subscriptions = [];
    this._products = [];
  }


  ngOnInit(): void {
    this.getProductList();
  }


  ngOnDestroy(): void { }


  productsTrackBy(index: number, product: Product): number {
    return +product.id;
  }


  private getProductList(): void {
    this._productService.getProductList().subscribe(
      (response) => {
        this._products = response.payload;
        this.filteredProducts = this._products;

        this.subscribeToQueryParamsChange();
      }
    );
  }


  private subscribeToQueryParamsChange(): void {
    this.subscriptions.push(

      this._activatedRoute.queryParamMap.pipe(
        filter(
          (queryParamMap) => !!queryParamMap
        ),
        tap(
          (queryParamMap) => {
            this.filterProductsBySearchTerm(queryParamMap.get(SEARCH_QUERY_PARAMETER))
          }
        )
      ).subscribe()

    );
  }


  private filterProductsBySearchTerm(searchTerm: string | null): void {

    if (!searchTerm) {
      this.filteredProducts = this._products;
      return;
    }

    this.filteredProducts = this._products.filter(
      (product) => {
        const content = (product.title + product.description).toLowerCase();
        return content.includes(searchTerm.toLowerCase());
      }
    );
  }
}
