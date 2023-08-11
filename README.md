# Test Task Store Angular 

nvm use 18.17.1 

!!! 
TODO
LocaStorage чистится после рефреша. Почему?
Исправить
https://dev-academy.com/angular-local-storage/

- Сделать Infinite scroll

Angular virtual scroller library 
https://www.youtube.com/watch?v=PetKs6326n4 

ngx-virtual-scroller 

https://javascript.plainenglish.io/how-to-create-infinite-loading-with-angular-14-and-intersection-observer-3e0e679ade4c

сделать с помощью директив

https://levelup.gitconnected.com/implementing-infinite-scrolling-using-angular-82c66f27e817 

- Сделать Login
https://jasonwatmore.com/post/2022/11/29/angular-14-user-registration-and-login-example-tutorial



### Requirements:
- Implement a login system using Angular to allow users to sign in with a username and password.
- Infinite scroll on main page - Implement infinite scroll on the home page. The application should load more products automatically as the user scrolls down the page.
- Full featured shopping cart  Users should be able to add products to their shopping cart. The cart should display the selected products with their details (name, price, quantity).
- Ensure that the cart persists across page refreshes.
- Implement appropriate error handling and display error messages in case of API failures or other errors.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


https://javascript.plainenglish.io/how-to-create-infinite-loading-with-angular-14-and-intersection-observer-3e0e679ade4c 


### How to Use Angular 14+ and Intersection Observer to Create An Infinite Scrolling List 

If you regularly develop Angular apps, then sooner or later, you will encounter the requirement that new elements should be dynamically fetched when the user scrolls to a list’s end.

This behavior is also known as Infinite Scrolling.

Of course, you could use the good ol’ .addEventListener('scroll', callback()) for this. However, this solution is quite inperformant and besides, in 2022 there is already a much more elegant method: the IntersectionObserver. 

With the IntersectionObserver you can also do other things, like reloading images via lazyloadbut there is a better method now:

In the following, I will show you how to build a Directive yourself, which will trigger an event as soon as the user has reached the end of a list:

The Directive
To be exact, there are two Directives, which I will explain in more detail in a moment. The first one does the actual work and the second one only serves as an (optional) marker if the event should not be attached to the document. 

// scroll-end.directive.ts
import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Optional, Output } from '@angular/core';
import { ScrollEndRootDirective } from './scroll-end-root.directive';
export enum SCROLLEND_DIRECTION {
  DOWN = 'down',
  UP = 'UP',
}

@Directive({
  selector: '[scrollEnd]',
})
export class ScrollEndDirective implements OnInit, OnDestroy {
  @Output() scrollEnd: EventEmitter<any> = new EventEmitter();

  @Input() rootMargin = '0px 0px 0px 0px';
  @Input('direction') desiredDirection: SCROLLEND_DIRECTION = SCROLLEND_DIRECTION.DOWN;

  observer: IntersectionObserver;
  previousEntry: IntersectionObserverEntry;
  scrollDirection: SCROLLEND_DIRECTION;

  constructor(
    private el: ElementRef,
    @Optional() private scrollEndRoot: ScrollEndRootDirective,
  ) { }

  ngOnInit(): void {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.scrollDirection = this.previousEntry?.boundingClientRect.bottom > entry.boundingClientRect.bottom ? SCROLLEND_DIRECTION.DOWN : SCROLLEND_DIRECTION.UP;

        if (!this.previousEntry?.isIntersecting && entry.isIntersecting && this.scrollDirection === this.desiredDirection) {
          this.scrollEnd.emit();
        }

        this.previousEntry = entry;
      });
    }, {
      root: this.scrollEndRoot?.el.nativeElement,
      rootMargin: this.rootMargin,
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}

// scroll-end-root.directive.ts
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[scrollEndRoot]',
})
export class ScrollEndRootDirective {
  constructor(
    public el: ElementRef,
  ) {
  }
}
Usage
As an example, let’s assume a list of notifications that are to be reloaded dynamically:

<div class="notifications" scrollEndRoot>
  <div *ngFor="let notification of notifications$ | async">...</div>
  <div (scrollEnd)="loadMore()" rootMargin="0px 0px 100px 0">
    <loading-spinner *ngIf="loading$ | async)"></loading-spinner>
  </div>
</div>
How does it work?
The question remains regarding how the whole thing works:

In our example div.notifications has a fixed height (e.g. 500px) and overflow: auto . When the list of notifications$ reaches its end, the div with the <loading-spinner> comes into view. As soon as this happens, the IntersectionObserver in scroll-end.directive.ts is triggered and passes the event to (scrollEnd).

Care is taken to ensure that the event is only triggered if the user either scrolled in the opposite direction or the element was scrolled out of the screen at least once.

By the way, with the help of desiredDirection="UP" you can also reverse the behavior.

In addition, you can use a buffer to the margin with the help of rootMargin. In our case 0px 0px 100px 0px ensures that the event is already triggered when the end of the list is still 100px away from the viewport.

You can also leave out the scrollEndRoot. Then the IntersectionObserver is automatically attached to the viewport of the browser. This is useful, for example, if there is only one full-screen table on the entire page.

Summary
As you can see, it’s not that hard to develop an Infinite Loading using an Angular Directive and the IntersectionObserver.

If you have any questions, don’t be afraid to drop me a response or contact me on Twitter at @saschawolff1.

If you want to read more exciting articles, try this one:

https://medium.com/@sascha.wolff/utility-first-css-ridiculously-fast-front-end-development-for-almost-every-design-503130d8fefc

More content at PlainEnglish.io. Sign up for our free weekly newsletter. Follow us on Twitter and LinkedIn. Check out our Community Discord and join our Talent Collective.

Web Development
Intersection Observer