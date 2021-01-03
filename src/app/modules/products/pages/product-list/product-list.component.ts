import { CATEGORY_QUERY_PARAMETER, PRICE_QUERY_PARAMETER, SEARCH_QUERY_PARAMETER, IN_STOCK_QUERY_PARAMETER } from './../../../../constants/route.constants';
import { Product } from 'src/app/interfaces/product.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ActivatedRoute } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { NgxSmartModalService } from 'ngx-smart-modal';

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
    private _ngxSmartModal: NgxSmartModalService,
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


  openModal(): void {
    this._ngxSmartModal.open('addEditProductModal');
  }


  appendNewProduct(product: Product): void {
    this.products.push(product);
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
            const productsByCategory = this.filterProductsByCategory(category, productsByPrice);

            const inStockQueryParam = queryParamMap.get(IN_STOCK_QUERY_PARAMETER);
            if (inStockQueryParam === null) {
              this.products = this.filterProductsByInStock(null, productsByCategory);
            } else {
              const inStock: boolean = queryParamMap.get(IN_STOCK_QUERY_PARAMETER) === 'true';
              this.products = this.filterProductsByInStock(inStock, productsByCategory);
            }

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


  private filterProductsByInStock(
    inStock: boolean | null,
    products: Product[]
  ): Product[] {

    if (inStock === null || inStock === undefined) {
      return products;
    }

    return products.filter(
      (product) => {
        return product.inStock === inStock
      }
    )
  }
}
