import { Product } from 'src/app/interfaces/product.interface';
import { PRODUCTS_ID_PARAMETER } from './../../../../constants/route.constants';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'pma-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productData: Product | null;


  constructor(
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.productData = null;
  }


  ngOnInit(): void {
    this.getProductDetails();
  }


  private getProductDetails(): void {

    const productId = this._activatedRoute.snapshot.paramMap.get(PRODUCTS_ID_PARAMETER);
    if (productId) {
      this._productService.getProductById(productId).subscribe(
        (response) => {
          this.productData = response.payload;
        }
      );
    }
  }

}
