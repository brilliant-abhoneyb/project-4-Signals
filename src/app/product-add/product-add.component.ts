import { Component, computed, effect } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MainService } from '../service/main.service';
import { TranslationService } from '../service/translation.service';

@Component({
  standalone: false,
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  productForm: any;

  buttonText = computed(() => {
    const saleNumber = this.productForm?.value?.saleNumber ?? 0;
    return saleNumber > 0
      ? this.translation.translations().updateProduct
      : this.translation.translations().addProduct;
  });

  constructor(
    private builder: FormBuilder,
    public service: MainService,
    public translation: TranslationService
  ) {
    this.productForm = this.builder.group({
      saleNumber: this.builder.control(0),
      code: this.builder.control(''),
      name: this.builder.control(''),
      quantity: this.builder.control(1),
      price: this.builder.control(0),
      total: this.builder.control(0)
    });

    effect(() => {
      const item = this.service.productItem();
      this.productForm.setValue({
        saleNumber: item.saleNumber,
        code: item.code,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      });
    });
  }

  addProduct() {
    const quantity = this.productForm.value.quantity as number;
    const price = this.productForm.value.price as number;
    const total = quantity * price;
    const saleNumber = this.productForm.value.saleNumber as number;

    const obj = {
      saleNumber: 0,
      code: this.productForm.value.code,
      name: this.productForm.value.name,
      price,
      quantity,
      total
    };

    if (saleNumber === 0) {
      const maxId = this.service.productList().length > 0
        ? Math.max(...this.service.productList().map(item => item.saleNumber ?? 0))
        : 0;
      obj.saleNumber = maxId + 1;
      this.service.addProduct(obj);
    } else {
      obj.saleNumber = saleNumber;
      this.service.updateProduct(obj);
    }

    this.productForm.setValue({
      saleNumber: 0,
      code: '',
      name: '',
      quantity: 1,
      price: 0,
      total: 0
    });
  }

  productChange(element: any) {
    const productName = element.target['options'][element.target['options'].selectedIndex].text;
    this.productForm.controls['name'].setValue(productName);
  }
}
