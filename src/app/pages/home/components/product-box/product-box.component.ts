import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: `./product-box.component.html`
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  // = {
  //   id: 1,
  //   title: 'Sneackers',
  //   price: 150,
  //   category: 'shoes',
  //   description: 'sneacckers descriptipn',
  //   image: 'https://via.placeholder.com/200'
  // };

  @Output() addToCart = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }


}
