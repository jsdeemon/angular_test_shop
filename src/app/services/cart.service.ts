import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from 'src/app/models/cart.model';

import { LocalService } from './local.service';

import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// how to use localStorage in Angular
// https://dev-academy.com/angular-local-storage/ 



@Injectable({
  providedIn: 'root'
})
export class CartService {
  private window: any;
//  itms = []

// public cartFromStorage() {
//   return localStorage.getItem('cart')
// }

// cart = localStorage.getItem('cart')
// the_cart: CartItem = localStorage.getItem('cart')
//  cart = new BehaviorSubject<Cart>({items: [
//   this.the_cart
//  ]}
//   )

  // {
  //   product: "Asus",
  //   name: "Laptop",
  //   price: 120,
  //   quantity: 3,
  //   id: 3
  // }
//  ]})


   

  constructor(private localStore: LocalService, private _snackbar: MatSnackBar) { 

  //  this.window = <any>this.document.defaultView;
  }
  
  // cartItemsFromStorage = JSON.parse(this.localStore.getData('cart'))
  // cartItemsFromStorage: any = JSON.parse(localStorage['cart']) ? JSON.parse(localStorage['cart']) : [];
  cartItemsFromStorage: any = !!localStorage['cart'] ? JSON.parse(localStorage['cart']) : [];
  // itemsArray = cartItemsFromStorage ? cartItemsFromStorage : [];

  cart = new BehaviorSubject<Cart>(
     { items: this.cartItemsFromStorage }
     )
    
  addToCart(item: CartItem): void {
  
  const items = [...this.cart.value.items];
  localStorage.setItem('cart', JSON.stringify(items))

  const itemInCart = items.find((_item) => _item.id === item.id) 

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    // saving data in local storage
    this.localStore.saveData('cart', JSON.stringify(items))
    this._snackbar.open('1 item added to cart', 'Ok', { duration: 3000 });

  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval: any | undefined ;
    let filteredItems = this.cart.value.items.map((_item: CartItem) => {
      if(_item.id === item.id) {
        _item.quantity--;

        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });

    if (itemForRemoval) {
        filteredItems = this.removeFromCart(itemForRemoval, false);

        this.cart.next({ items: filteredItems });
        this._snackbar.open('1 item was removed from cart', 'Ok', { duration: 3000 });
    }
  }

  getTotal(items: Array<CartItem>): number {
    return items
    .map((item) => item.price * item.quantity)
    .reduce((prev, current) => prev + current, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this.localStore.removeData('cart')
    this._snackbar.open('Cart has been cleared', 'Ok', {duration: 3000});
  }

  removeFromCart(item: CartItem, update = true): Array<CartItem> {
    const filteredItems = this.cart.value.items.filter((_item: any) => _item.id !== item.id );

    if(update) {
      this.cart.next({ items: filteredItems });
      this._snackbar.open('1 item removed from cart', 'Ok', { duration: 3000 });
    }

    this.localStore.removeData('cart')
    this.localStore.saveData('cart', JSON.stringify(filteredItems))
    return filteredItems;
     
  };




}
