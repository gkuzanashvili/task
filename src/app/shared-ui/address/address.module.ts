import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address.component';
import {InputModule} from '../input/input.module';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [AddressComponent],
  exports: [
    AddressComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    ReactiveFormsModule
  ]
})
export class AddressModule { }
