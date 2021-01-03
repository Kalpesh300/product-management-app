import { PRODUCTS_LIST_PAGE_PATH } from './../../../../constants/route.constants';
import { Product } from 'src/app/interfaces/product.interface';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'pma-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {

  PRODUCTS_LIST_PAGE_PATH: string;

  @Input() productData: Product | null;
  @Output() restore: EventEmitter<Product>;

  constructor(
    private _productService: ProductService,
    private _ngxSmartModal: NgxSmartModalService,
  ) {
    this.productData = null;
    this.restore = new EventEmitter<Product>();
    this.PRODUCTS_LIST_PAGE_PATH = PRODUCTS_LIST_PAGE_PATH;
  }


  deleteProduct(event: Event): void {

    event.stopImmediatePropagation();
    event.preventDefault();

    const modalData = {
      title: this.productData?.title,
      id: this.productData?.id
    };
    this._ngxSmartModal.setModalData(modalData, 'confirmationModal', true);
    this._ngxSmartModal.open('confirmationModal');
  }


  restoreProduct(event: Event): void {

    event.stopImmediatePropagation();
    event.preventDefault();

    if (this.productData) {

      this._productService.restoreProduct(this.productData.id).subscribe(
        (response) => {
          this.restore.emit(response.payload);
        }
      );
    }
  }

}
