import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsListHeaderComponent } from './components/products-list-header/products-list-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsFilterPanelComponent } from './components/products-filter-panel/products-filter-panel.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { AddProductModalComponent } from './components/add-product-modal/add-product-modal.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent,
    ProductsListHeaderComponent,
    ProductsFilterPanelComponent,
    ProductDetailsComponent,
    AddProductModalComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RatingModule,
    NgxSmartModalModule.forChild()
  ],
  providers: [
    ProductService
  ]
})
export class ProductsModule { }
