import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';

const FAKE_STORE_API = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(limit = '3', sort = 'desc'): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      `${FAKE_STORE_API}/products?sort=${sort}&limit=${limit}`
    )
  }

  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${FAKE_STORE_API}/products/categories`
    )
  }

}
