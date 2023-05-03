import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: 'district', loadChildren: () => import('./district/district.module').then(m => m.DistrictModule ) },
  {path: 'designation', loadChildren:() => import('./designation/designation.module').then(m=>m.DesignationModule)},
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
  { path: 'employee-type', loadChildren: () => import('./employee-type/employee-type.module').then(m => m.EmployeeTypeModule) },
  { path: 'empgroup', loadChildren: () => import('./empgroup/empgroup.module').then(m => m.EmpgroupModule) },
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MastersModule { }
