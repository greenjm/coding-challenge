import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private BASE_URL = 'http://localhost:3000/product'

  constructor(private http: HttpClient) { }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.BASE_URL, product);
  }

  listProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.BASE_URL);
  }
}
