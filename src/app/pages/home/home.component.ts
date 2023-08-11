
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import  { Subscription } from 'rxjs'; 
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

import { HostListener } from '@angular/core';



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
  items = [];
  productsSubscription: Subscription | undefined;
  product = {}


 

  constructor(private cartService: CartService, private storeService: StoreService) { }

  // @HostListener("window:scroll", []) onWindowScroll() {
  //   // do some stuff here when the window is scrolled
  //   // нужно добавить число, сложить с числом и потом перевести в тип строки
    
  //  // this.count = (+this.count + 1).toString();
  //  this.prev = Number(this.count) + 3
  //  this.count = this.prev.toString();
  //    this.getProducts()
  
    
  //   // this.products = this.products?.slice(0,2);
  //   const verticalOffset = window.pageYOffset 
  //         || document.documentElement.scrollTop 
  //         || document.body.scrollTop || 0;
  // }

  @HostListener('window:scroll')
onWindowScroll() {
    console.log("scrolling...");
       this.count = (+this.count + 1).toString();
   this.prev = Number(this.count) + 3
    this.count = this.prev.toString();
    console.log(this.count)
     // this.getProducts()
}

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

