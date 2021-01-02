import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CATEGORY_QUERY_PARAMETER, PRICE_QUERY_PARAMETER } from 'src/app/constants/route.constants';

@Component({
  selector: 'pma-products-filter-panel',
  templateUrl: './products-filter-panel.component.html',
  styleUrls: ['./products-filter-panel.component.scss']
})
export class ProductsFilterPanelComponent implements OnInit {

  priceFilters: number[];
  productCategories: string[];
  selectedPriceFilter: number | null;
  selectedProductCategory: string | null;


  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.priceFilters = [
      125000,
      100000,
      75000,
      50000,
      25000
    ]

    this.productCategories = [
      'iPhone',
      'iPad'
    ];

    this.selectedPriceFilter = null;
    this.selectedProductCategory = null;
  }


  ngOnInit(): void {
    this.setInitialFilters();
  }


  changeSelectedProductCategory(category: string): void {

    this.selectedProductCategory = category;
    this._router.navigate(
      [],
      {
        relativeTo: this._activatedRoute,
        queryParams: {
          [CATEGORY_QUERY_PARAMETER]: category
        },
        queryParamsHandling: 'merge'
      }
    );
  }


  changePriceFilter(priceFilter: number): void {

    this.selectedPriceFilter = priceFilter;
    this._router.navigate(
      [],
      {
        relativeTo: this._activatedRoute,
        queryParams: {
          [PRICE_QUERY_PARAMETER]: priceFilter
        },
        queryParamsHandling: 'merge'
      }
    );
  }


  clearAllFilters(): void {

    this.selectedProductCategory = null;
    this.selectedPriceFilter = null;

    this._router.navigate(
      [],
      {
        relativeTo: this._activatedRoute,
        queryParams: {
          [PRICE_QUERY_PARAMETER]: null,
          [CATEGORY_QUERY_PARAMETER]: null,
        },
        queryParamsHandling: 'merge'
      }
    );
  }


  private setInitialFilters(): void {
    const queryParamMap = this._activatedRoute.snapshot.queryParamMap;
    const priceFilter = queryParamMap.get(PRICE_QUERY_PARAMETER);

    if (priceFilter) {
      this.selectedPriceFilter = +priceFilter;
    } else {
      this.selectedPriceFilter = null;
    }

    this.selectedProductCategory = queryParamMap.get(CATEGORY_QUERY_PARAMETER);
  }
}
