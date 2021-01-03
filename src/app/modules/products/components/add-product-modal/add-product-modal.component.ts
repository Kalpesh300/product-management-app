import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@ngneat/reactive-forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Product, ProductFormValue } from 'src/app/interfaces/product.interface';
import { ProductService } from '../../services/product.service';

interface FormErrors {
  [key: string]: Array<{
    type: string
    message: string
  }>
}

@Component({
  selector: 'pma-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent {

  productForm: FormGroup<ProductFormValue>;
  productFormErrors: FormErrors;

  @Output() productAdd: EventEmitter<Product>;


  constructor(
    private _ngxSmartModal: NgxSmartModalService,
    private _fb: FormBuilder,
    private _productService: ProductService,
  ) {

    this.productAdd = new EventEmitter<Product>();

    this.productForm = this._fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      imageUrl: ['', [Validators.required, Validators.pattern(new RegExp('(\b(https?|ftp|file)://)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]'))]],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]],
      inStock: ['inStock', [Validators.required]],
      ratingStar: [0, [Validators.required]],
    });

    this.productFormErrors = {
      title: [
        {
          type: 'required',
          message: 'Please provide a title.'
        },
        {
          type: 'maxLength',
          message: 'The character limit is 50.'
        },
      ],
      description: [
        {
          type: 'required',
          message: 'Please provide a description.'
        },
        {
          type: 'maxLength',
          message: 'The character limit is 150.'
        },
      ],
      imageUrl: [
        {
          type: 'required',
          message: 'Please provide an image URL.'
        },
        {
          type: 'pattern',
          message: 'Please provide correct URL.'
        },
      ],
      price: [
        {
          type: 'required',
          message: 'Please provide a price.'
        },
        {
          type: 'min',
          message: 'The price cannot be less than 0.'
        }
      ],
      category: [
        {
          type: 'required',
          message: 'Please provide a category.'
        }
      ],
      ratingStar: [
        {
          type: 'required',
          message: 'Please provide a rating.'
        }
      ],
    }
  }


  closeModal(): void {
    this._ngxSmartModal.close('addEditProductModal');
  }


  addProduct(): void {

    const productData: ProductFormValue = {
      ...this.productForm.value,
      inStock: this.productForm.value.inStock === 'inStock' ? true : false
    };
    this._productService.addProduct(this.productForm.value).subscribe(
      (response) => {
        this.productAdd.emit(response.payload);
        this.closeModal();
      }
    );
  }
}
