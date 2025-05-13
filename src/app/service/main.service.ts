import { Injectable, signal, computed } from '@angular/core';
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

  deleteProduct(saleNumber: number) {
    this.productList.set(
      this.productList().filter(item => item.saleNumber !== saleNumber)
    );
  }  

  totalQuantity = computed(()=>this.productList().length)
  totalSum = computed(()=> this.productList().reduce((prev:any, curr:Product)=>{
    return prev+curr.total
  }, 0))

  totalTax = computed(()=> (this.totalSum()*7)/100);
  totalNet = computed(()=> (this.totalSum()+this.totalTax()));
}
