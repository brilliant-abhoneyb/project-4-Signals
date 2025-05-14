import { Component, effect } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MainService } from '../service/main.service';
import { Product } from '../models/product.model';

@Component({
  standalone: false,
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  productForm:any;
  buttonText="Add Product"

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
      const item = this.service.productItem();
      if (item?.saleNumber != null && item.saleNumber > 0) {
        this.buttonText = "Update";
      }      
    })
  }

  addProduct() {
    let quantity = this.productForm.value.quantity as number;
    let price = this.productForm.value.price as number;
    let total = quantity * price;
    let saleNumber = this.productForm.value.saleNumber as number;

    const obj: Product={
      saleNumber: 0,
      code: this.productForm.value.code as string,
      name: this.productForm.value.name as string,
      price: price,
      quantity: quantity,
      total: total
    }
    if(saleNumber == 0){
      const maxId = this.service.productList().length > 0? 
      Math.max(...this.service.productList().map(item => item.saleNumber ?? 0)) : 0;
      obj.saleNumber = maxId + 1;
      this.service.addProduct(obj);
    }else{
      obj.saleNumber = saleNumber;
      this.service.updateProduct(obj);
    }
    this.productForm.setValue(
      {saleNumber:0, code: '', name: '',
        quantity: 1,
        price: 0,
        total: 0
      }
    )
    this.buttonText = "Add Product"
  }

  productChange(element:any){
    let productName = element.target['options'][element.target['options'].selectedIndex].text;
    this.productForm.controls['name'].setValue(productName);
  }
}
