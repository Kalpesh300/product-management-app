
import { Component } from '@angular/core';
import { PRODUCTS_LIST_PAGE_PATH, PRODUCTS_TRASH_PAGE_PATH } from 'src/app/constants/route.constants';
import { NavigationRoutes } from 'src/app/interfaces/routes.interface';

@Component({
  selector: 'pma-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.scss']
})
export class NavigationPanelComponent {

  navigationRoutes: NavigationRoutes;


  constructor() {
    this.navigationRoutes = {
      productsListPagePath: PRODUCTS_LIST_PAGE_PATH,
      productsTrashPagePath: PRODUCTS_TRASH_PAGE_PATH,
    };
  }
}