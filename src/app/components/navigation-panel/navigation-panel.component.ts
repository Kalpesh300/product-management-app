
import { NAVIGATION_ROUTES } from '@pma/constants/route.constants';
import { Component } from '@angular/core';

@Component({
  selector: 'pma-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.scss']
})
export class NavigationPanelComponent {

  navigationRoutes: typeof NAVIGATION_ROUTES;


  constructor() {
    this.navigationRoutes = NAVIGATION_ROUTES;
  }
}