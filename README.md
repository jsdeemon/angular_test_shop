# Test Task Store Angular 

nvm use 18.17.1 

- !!!! TODO
доделать API и infinite scroll так, чтобы оно работало как положено, с интервалом. подгружались товары
компонент 
- Make use of services and observables to manage data flow and API calls. 

сделать по этой статье
https://www.htmlgoodies.com/javascript/infinite-scrolling-the-angular-6-and-rxjs-way/

### How to run the app on Linux Ubuntu
- you need to have NodeJs v18 to be installed

```bash
$ git clone https://github.com/jsdeemon/angular_test_shop.git
$ cd angular_test_shop
$ npm install
```

- If you have not installed Angular CLI, please, install it globally:
```bash
$ npm iinstall -g @angular/cli@14.2.1
```
- Run the dev server
```bash
$ ng serve
```
- Open in web browser http://localhost:4200
- Register
- Login with your username and password


### Requirements:
- Implement a login system using Angular to allow users to sign in with a username and password.
- Infinite scroll on main page - Implement infinite scroll on the home page. The application should load more products automatically as the user scrolls down the page.
- Full featured shopping cart  Users should be able to add products to their shopping cart. The cart should display the selected products with their details (name, price, quantity).
- Ensure that the cart persists across page refreshes.
- Implement appropriate error handling and display error messages in case of API failures or other errors.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


