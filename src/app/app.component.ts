import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from './services/cart.service';
import { LocalService } from './services/local.service';

import { AccountService } from './services/account.service'; 
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  template: `
    <app-header [cart]="cart"></app-header>
    <router-outlet></router-outlet>
  `,
  styles: []
})

export class AppComponent implements OnInit {
  user?: User | null;


  constructor(private cartService: CartService, private localStore: LocalService, private accountService: AccountService ) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.accountService.logout();
}

 
   cart: any = { items: [] }; 
 
  

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      
         this.cart = _cart; 
     
    })
  }


}


