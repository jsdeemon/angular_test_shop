import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from './services/cart.service';
import { LocalService } from './services/local.service';

@Component({
  selector: 'app-root',
  template: `
    <app-header [cart]="cart"></app-header>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
 // values: any = JSON.parse(localStorage.getItem("cart"));
  //cart: Cart = { items: []};
// cart: any = localStorage.getItem('cart')

  constructor(private cartService: CartService, private localStore: LocalService ) {}

  // values = JSON.parse(this.localStore.getData('cart'));
  // cart: Cart = { items: [] }; 

   cart: any =  localStorage.getItem('cart'); 

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
       this.cart = _cart;
       this.localStore.saveData('cart', JSON.stringify(_cart));
     //  this.cart = this.localStore.getData('cart');
     
    })
  }


  ngOninit(): void {
    this.localStore.getData('cart');
  }
}


