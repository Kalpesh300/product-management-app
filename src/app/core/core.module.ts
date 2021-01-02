import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiCallerService } from './services/api-caller.service';


@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    ApiCallerService
  ]
})
export class CoreModule { }
