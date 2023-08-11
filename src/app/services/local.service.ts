import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  // cart = new BehaviorSubject<any>(
  //   // { items: localStorage['cart'].items }
  //   { items: localStorage['cart'].items }
  //      //  { items: JSON.parse(this.retrievedData.items) }
  //      //JSON.parse(this.retrievedData)
  //    )

  constructor() { }
  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  public getData(key: string) {
    return localStorage.getItem(key)
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }
  public clearData() {
    localStorage.clear();
  }
}
