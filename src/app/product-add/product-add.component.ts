import { Component, effect } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MainService } from '../service/main.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-add',
  standalone: false,
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  productForm:any;

  constructor(
    private builder:FormBuilder,
    public service: MainService
  ) {
    this.productForm = this.builder.group({
      saleNumber: this.builder.control(0),
      code: this.builder.control(''),
      name: this.builder.control(''),
      quantity: this.builder.control(1),
      price: this.builder.control(0),
      total: this.builder.control(0)
    });

    effect(()=>{
      this.productForm.setValue({
        saleNumber: this.service.productItem().saleNumber,
        code: this.service.productItem().code,
        name: this.service.productItem().name,
        quantity: this.service.productItem().quantity,
        price: this.service.productItem().price,
        total: this.service.productItem().total,
      })
    })
  }

  addProduct() {
    let quantity = this.productForm.value.quantity as number;
    let price = this.productForm.value.price as number;
    let total = quantity * price;

    const obj: Product={
      saleNumber: this.service.productList().length+1,
      code: this.productForm.value.code as string,
      name: this.productForm.value.name as string,
      price: price,
      quantity: quantity,
      total: total
    }
    this.service.addProduct(obj);
    this.productForm.setValue(
      {saleNumber:0, code: '', name: '',
        quantity: 1,
        price: 0,
        total: null
      }
    )
  }

  productChange(element:any){
    let productName = element.target['options'][element.target['options'].selectedIndex].text;
    this.productForm.controls['name'].setValue(productName);
  }
}
