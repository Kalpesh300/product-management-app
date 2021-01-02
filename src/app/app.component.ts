import { Component } from '@angular/core';
import mockServer from 'src/app/mock-backend/root.server';
@Component({
  selector: 'pma-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    mockServer();
  }
}
