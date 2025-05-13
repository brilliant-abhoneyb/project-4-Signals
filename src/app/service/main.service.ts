import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  productList=signal<Product[]>([]);
  productItem=signal<Product>({
    saleNumber: 0,
    code: '',
    name: '',
    price: 0,
    quantity: 1,
    total: 0
  })


  addProduct(product:Product){
    this.productList.update((previous: Product[]) => [...previous, product]);
  }

  updateProduct(product:Product){
    let newArray=this.productList().map(item=>{
      return item.saleNumber===product.saleNumber?product:item
    });
    this.productList.set(newArray);
  }

  deleteProduct(saleNumber: number) {
    this.productList.set(
      this.productList().filter(item => item.saleNumber !== saleNumber)
    );
  }  

  getProductByCode(saleNumber:number){
    this.productItem.set(this.productList().find(item=>item.saleNumber===saleNumber) as Product);
  }

  totalQuantity = computed(()=>this.productList().length)
  totalSum = computed(()=> this.productList().reduce((prev:any, curr:Product)=>{
    return prev+curr.total
  }, 0))
  totalTax = computed(()=> (this.totalSum()*7)/100);
  totalNet = computed(()=> (this.totalSum()+this.totalTax()));
}
