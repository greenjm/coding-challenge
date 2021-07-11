import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private BASE_URL = 'http://localhost:3000/product';

  constructor(private http: HttpClient) { }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.BASE_URL, product);
  }

  listProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.BASE_URL);
  }

  getProductDetail(name: string): Observable<Product> {
    let params = new HttpParams();
    params = params.append('name', name);

    return this.http.get<Product>(this.BASE_URL + '/find', { params });
  }

  deleteProduct(name: string): Observable<number> {
    let params = new HttpParams();
    params = params.append('name', name);

    return this.http.delete<number>(this.BASE_URL, { params });
  }

  updateProduct(product: Product): Observable<number> {
    return this.http.patch<number>(this.BASE_URL, product);
  }
}
