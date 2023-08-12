import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';

import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './account/login.component';
import { LayoutComponent } from './account/layout.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'users', 
    loadChildren: usersModule, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'account', 
    loadChildren: accountModule 
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  // otherwise redirect to home
  {
    path: '*', redirectTo: 'home', 
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

