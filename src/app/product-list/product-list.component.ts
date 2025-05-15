import { Component } from '@angular/core';
import { MainService } from '../service/main.service';
import { TranslationService } from '../service/translation.service';

@Component({
  standalone: false,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  constructor(
    public service: MainService,
    public translation: TranslationService
  ) {}

  deleteItem(saleNumber:any) {
    this.service.deleteProduct(saleNumber)
  }

  updateItemData(saleNumber:any){
    this.service.getProductByCode(saleNumber);
  }
}
