import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: 'district', loadChildren: () => import('./district/district.module').then(m => m.DistrictModule ) },
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
  { path: 'employee-type', loadChildren: () => import('./employee-type/employee-type.module').then(m => m.EmployeeTypeModule) },
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MastersModule { }
