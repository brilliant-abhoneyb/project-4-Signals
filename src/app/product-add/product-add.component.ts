import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MainService } from '../service/main.service';

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
  }

  addProduct() {}
}
