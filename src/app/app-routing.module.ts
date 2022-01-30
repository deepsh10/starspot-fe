import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { HomeComponent } from './home/home.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';

const routes: Routes = [

  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      {path:'auth-access', component: HomeComponent},
      {path:'verify-access', component: VerifyUserComponent},
      { path: '**', redirectTo: 'verify-access' }
    ]
  }

];

export const routing = RouterModule.forRoot(routes);
