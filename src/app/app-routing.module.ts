import { PRODUCTS_MODULE_PATH } from './constants/route.constants';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: PRODUCTS_MODULE_PATH,
    loadChildren: () => import('src/app/modules/products/products.module').then(mod => mod.ProductsModule),
  },
  {
    path: '**',
    redirectTo: ''
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
