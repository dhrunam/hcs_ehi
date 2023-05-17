import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const route: Routes =[
 {path:"health-record", loadChildren: ()=>import('./employee/employee.module').then(m=>m.EmployeeModule) },
]

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
  ]
})
export class OperationsModule { }
