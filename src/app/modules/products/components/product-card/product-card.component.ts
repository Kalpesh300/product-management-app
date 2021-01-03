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

  @Input() productData: Product | null;

  constructor(
    private _productService: ProductService,
    private _ngxSmartModal: NgxSmartModalService,
  ) {
    this.productData = null;
  }


  deleteProduct(event: Event): void {

    event.stopImmediatePropagation();
    event.preventDefault();

    const modalData = {
      title: this.productData?.title,
      id: this.productData?.id
    };
    this._ngxSmartModal.setModalData(modalData, 'confirmationModal');
    this._ngxSmartModal.open('confirmationModal');
  }

}
