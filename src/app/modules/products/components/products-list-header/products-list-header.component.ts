import { SEARCH_QUERY_PARAMETER } from './../../../../constants/route.constants';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@ngneat/reactive-forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SEARCH_DEBOUNCE_TIME } from 'src/app/constants/shared.constants';

@AutoUnsubscribe()
@Component({
  selector: 'pma-products-list-header',
  templateUrl: './products-list-header.component.html',
  styleUrls: ['./products-list-header.component.scss']
})
export class ProductsListHeaderComponent implements OnInit, OnDestroy {

  searchControl: FormControl<string | null>;
  searchControlValueChangeSub: Subscription | null;


  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.searchControl = new FormControl('');
    this.searchControlValueChangeSub = null;
  }


  ngOnInit(): void {
    this.setInitialSearchValue();
    this.subscribeToSearchValueChange();
  }


  ngOnDestroy(): void { }


  private setInitialSearchValue(): void {
    const searchValue = this._activatedRoute.snapshot.queryParamMap.get(SEARCH_QUERY_PARAMETER);
    this.searchControl.setValue(searchValue);
  }


  private subscribeToSearchValueChange(): void {
    this.searchControlValueChangeSub = this.searchControl.valueChanges.pipe(
      debounceTime(SEARCH_DEBOUNCE_TIME),
      distinctUntilChanged(),
    ).subscribe(
      (searchTerm) => {
        this._router.navigate(
          [],
          {
            relativeTo: this._activatedRoute,
            queryParams: {
              [SEARCH_QUERY_PARAMETER]: searchTerm
            },
            queryParamsHandling: 'merge'
          }
        );
      }
    );
  }
}
