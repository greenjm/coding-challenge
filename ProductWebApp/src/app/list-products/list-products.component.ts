import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  public products: Product[] = [];
  public productSearchName: string = '';

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.productService.listProducts()
      .subscribe(p => {
        this.products = p;
      });
  }

  deleteProduct(name: string) {
    this.productService.deleteProduct(name)
      .subscribe(numDeleted => {
        if (numDeleted === 1) {
          this.products = this.products.filter(p => p.name !== name);
        }
      });
  }

  searchProducts() {
    this.router.navigate(['detail'], { queryParams: { name: this.productSearchName } });
  }

}
