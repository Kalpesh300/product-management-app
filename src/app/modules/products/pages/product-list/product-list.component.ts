import { Product } from 'src/app/interfaces/product.interface';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'pma-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[];


  constructor(
    private _productService: ProductService,
  ) {
    this.products = [];
  }


  ngOnInit(): void {
    this.getProductList();
  }


  productsTrackBy(index: number, product: Product): number {
    return +product.id;
  }


  private getProductList(): void {
    this._productService.getProductList().subscribe(
      (response) => {
        this.products = response.payload;
      }
    );
  }
}
