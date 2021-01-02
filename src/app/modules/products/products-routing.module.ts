import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PRODUCTS_LIST_PAGE_PATH } from 'src/app/constants/route.constants';
import { ProductListComponent } from './pages/product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: PRODUCTS_LIST_PAGE_PATH,
    pathMatch: 'full'
  },
  {
    path: PRODUCTS_LIST_PAGE_PATH,
    component: ProductListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
