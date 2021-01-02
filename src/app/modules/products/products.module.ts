import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsListHeaderComponent } from './components/products-list-header/products-list-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsFilterPanelComponent } from './components/products-filter-panel/products-filter-panel.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent,
    ProductsListHeaderComponent,
    ProductsFilterPanelComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    ProductService
  ]
})
export class ProductsModule { }
