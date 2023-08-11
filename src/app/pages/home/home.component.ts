
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import  { Subscription } from 'rxjs'; 
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

import { HostListener } from '@angular/core';

import { interval } from 'rxjs';

const ROWS_HEIGHT: {[id: number]: number} = {1: 400, 3: 335, 4: 350};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '1';
  prev: number = 0;
  productsSubscription: Subscription | undefined;



 

  constructor(private cartService: CartService, private storeService: StoreService) { }



  ngOnInit(): void {
    try {
      this.getProducts();
    } catch (error) {
      console.log(error)
    }
  
  }




   getProducts(): void {
    
      // this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort).subscribe((_products) => {
      //   this.products =  _products;
      // });

       this.productsSubscription = this.storeService.getLimitedProducts(this.count).subscribe((_products) => {
        this.products =  _products;
      });
  }

  currentPosition = window.pageYOffset;
  @HostListener('window:scroll', ['$event.target']) // for window scroll events
   scroll(e: any) {
    let scroll = e.scrollingElement.scrollTop;
    console.log("this is the scroll position", scroll)
    if (scroll > this.currentPosition) {
      console.log("scrollDown");
   //    this.count = (+this.count + 1).toString();
 this.prev = Number(this.count) + 1
  this.count = this.prev.toString();
  
     
     interval(1000).subscribe(x => {
      // something
      this.getProducts()
      });
      console.log(this.count)
    } else {
      console.log("scrollUp");
    }
    this.currentPosition = scroll;
  }
  


  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
}

onItemsCountChange(newCount: number): void {
  this.count = newCount.toString();
  this.getProducts();
}

onSortChange(newSort: string): void {
  this.sort = newSort;
  this.getProducts();
}

onShowCategory(newCategory: string): void {
  this.category = newCategory;
}

onAddToCart(product: Product): void {
  this.cartService.addToCart({
    product: product.image,
    name: product.title,
    price: product.price,
    quantity: 1,
    id: product.id
  })
}

ngOnDestroy(): void {
  if (this.productsSubscription) {
    this.productsSubscription.unsubscribe();
  }
}

}
function onWindowScroll() {
  throw new Error('Function not implemented.');
}

