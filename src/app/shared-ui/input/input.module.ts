import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import {AppModule} from '../../app.module';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {ValidatorModule} from '../validator/validator.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [InputComponent],
  exports: [
    InputComponent,
    InputTextModule,
  ],
    imports: [
        CommonModule,
        InputTextModule,
        InputNumberModule,
        DropdownModule,
        ValidatorModule,
        FormsModule,
    ]
})
export class InputModule { }
