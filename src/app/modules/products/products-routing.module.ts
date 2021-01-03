import { ProductTrashComponent } from './pages/product-trash/product-trash.component';
import { PRODUCTS_TRASH_PAGE_PATH } from './../../constants/route.constants';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PRODUCTS_LIST_PAGE_PATH, PRODUCTS_ID_PARAMETER } from 'src/app/constants/route.constants';
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
  },
  {
    path: PRODUCTS_TRASH_PAGE_PATH,
    component: ProductTrashComponent,
  },
  {
    path: `${PRODUCTS_LIST_PAGE_PATH}/:${PRODUCTS_ID_PARAMETER}`,
    component: ProductDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
