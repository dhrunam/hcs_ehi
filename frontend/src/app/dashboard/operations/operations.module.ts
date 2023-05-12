import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const route: Routes =[
 {path:"emp-health-record", loadChildren: ()=>import('./emp-health-record/emp-health-record.module').then(m=>m.EmpHealthRecordModule) },
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
