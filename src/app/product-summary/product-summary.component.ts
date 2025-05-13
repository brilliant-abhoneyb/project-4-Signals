import { Component } from '@angular/core';
import { MainService } from '../service/main.service';

@Component({
  standalone: false,
  selector: 'app-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrl: './product-summary.component.css'
})
export class ProductSummaryComponent {
  constructor(public service:MainService) {}
}
