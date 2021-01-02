import { Product } from 'src/app/interfaces/product.interface';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'pma-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {

  @Input() productData: Product | null;

  constructor() {
    this.productData = null;
  }

}
