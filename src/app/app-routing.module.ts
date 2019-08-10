import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.page';
import { AuthGuard } from './_guards/auth.guard';
import { Login2Page } from './auth/login2/login2.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login2',
    loadChildren: './auth/login2/login2.module#Login2PageModule'
  },
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
  { path: 'login2', loadChildren: './auth/login2/login2.module#Login2PageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
