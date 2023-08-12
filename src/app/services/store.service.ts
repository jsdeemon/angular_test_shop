import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import { MatSnackBar } from '@angular/material/snack-bar';

const FAKE_STORE_API = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient: HttpClient, private _snackbar: MatSnackBar) { }

  getAllProducts(limit = '3', sort = 'desc'): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      `${FAKE_STORE_API}/products?sort=${sort}&limit=${limit}`
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        // error logging,  you can do a lot more, see below
        console.error('An error occurred:', error.error)
        this._snackbar.open('An error occured: ' + error.error, 'Ok', { duration: 3000 });
        return throwError(error)
      })
    )
  }

  getLimitedProducts(limit = '3'): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      `${FAKE_STORE_API}/products?limit=${limit}`
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        // error logging,  you can do a lot more, see below
        console.error('An error occurred:', error.error)
        this._snackbar.open('Cannot load products ' + error.message, 'ERROR', { duration: 3000 });
        return throwError(error)
      })
    )
  }

  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${FAKE_STORE_API}/products/categories`
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        // error logging,  you can do a lot more, see below
        console.error('An error occurred:', error.error)
        return throwError(error)
      })
    )
  }

}
