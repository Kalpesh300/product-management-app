import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationPanelComponent } from './components/navigation-panel/navigation-panel.component';
import { CoreModule } from './core/core.module';
import { RatingModule } from 'ngx-bootstrap/rating';
import { NgxSmartModalModule } from 'ngx-smart-modal';

@NgModule({
  declarations: [
    AppComponent,
    NavigationPanelComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    RatingModule.forRoot(),
    NgxSmartModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
