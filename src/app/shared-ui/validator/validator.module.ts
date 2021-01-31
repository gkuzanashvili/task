import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatorComponent } from './validator.component';



@NgModule({
  declarations: [ValidatorComponent],
  exports: [
    ValidatorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ValidatorModule { }
