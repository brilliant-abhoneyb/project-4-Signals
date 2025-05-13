import { Component } from '@angular/core';
import { MainService } from '../service/main.service';

@Component({
  standalone: false,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  constructor(public service:MainService) {}

  deleteItem(saleNumber:any) {
    this.service.deleteProduct(saleNumber)
  }
}
