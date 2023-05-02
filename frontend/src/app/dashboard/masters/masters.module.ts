import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: 'district', loadChildren: () => import('./district/district.module').then(m => m.DistrictModule ) },
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MastersModule { }
