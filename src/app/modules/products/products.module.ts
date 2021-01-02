import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductService } from './services/product.service';


@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  providers: [
    ProductService
  ]
})
export class ProductsModule { }
