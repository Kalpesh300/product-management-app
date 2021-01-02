import { CATEGORY_QUERY_PARAMETER, PRICE_QUERY_PARAMETER, SEARCH_QUERY_PARAMETER } from './../../../../constants/route.constants';
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
  products: Product[];

  private _products: Product[];


  constructor(
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.products = [];
    this._products = [];
    this.subscriptions = [];
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

        this.products = response.payload;
        this._products = this.products;

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

            const productsBySearchTerm = this.filterProductsBySearchTerm(
              queryParamMap.get(SEARCH_QUERY_PARAMETER),
              this._products
            );

            const price = queryParamMap.get(PRICE_QUERY_PARAMETER);
            let productsByPrice: Product[];
            if (price) {
              productsByPrice = this.filterProductsByPrice(
                +price, productsBySearchTerm
              );
            } else {
              productsByPrice = this.filterProductsByPrice(
                null, productsBySearchTerm
              );
            }

            const category = queryParamMap.get(CATEGORY_QUERY_PARAMETER);
            this.products = this.filterProductsByCategory(category, productsByPrice);

          }
        )
      ).subscribe()

    );
  }


  private filterProductsBySearchTerm(
    searchTerm: string | null,
    products: Product[]
  ): Product[] {

    if (!searchTerm) {
      return products;
    }

    return products.filter(
      (product) => {
        const content = (product.title + product.description).toLowerCase();
        return content.includes(searchTerm.toLowerCase());
      }
    );
  }


  private filterProductsByPrice(
    price: number | null,
    products: Product[]
  ): Product[] {

    if (!price) {
      return products;
    }

    return products.filter(
      (product) => {
        return product.price < price
      }
    )
  }


  private filterProductsByCategory(
    category: string | null,
    products: Product[]
  ): Product[] {

    if (!category) {
      return products;
    }

    return products.filter(
      (product) => {
        return product.category === category
      }
    )
  }
}
