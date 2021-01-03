import { Product } from 'src/app/interfaces/product.interface';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'pma-product-trash',
  templateUrl: './product-trash.component.html',
  styleUrls: ['./product-trash.component.scss']
})
export class ProductTrashComponent implements OnInit {

  removedProducts: Product[];


  constructor(
    private _productService: ProductService,
  ) {
    this.removedProducts = [];
  }

  ngOnInit(): void {
    this.getDeletedProducts();
  }


  restoreProduct(restoredProduct: Product): void {
    const index = this.removedProducts.findIndex(
      (product) => product.id === restoredProduct.id
    )
    this.removedProducts.splice(index, 1);
  }


  private getDeletedProducts(): void {
    this._productService.getDeletedProducts().subscribe(
      (response) => {
        this.removedProducts = response.payload;
      }
    )
  }

}
