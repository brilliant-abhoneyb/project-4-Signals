import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  productList=signal<Product[]>([]);

  addProduct(product:Product){
    this.productList.update((previous: Product[]) => [...previous, product]);
  }
}
