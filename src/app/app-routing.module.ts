import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      {path:'', component: HomeComponent, pathMatch: 'full'},
      {path:'home', component: HomeComponent},
      {path:'database', component: HomeComponent}
    ]
  }

];

export const routing = RouterModule.forRoot(routes);
