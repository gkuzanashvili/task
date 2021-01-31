import {NgModule} from '@angular/core';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {RippleModule} from 'primeng/ripple';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {SelectButtonModule} from 'primeng/selectbutton';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputNumberModule} from 'primeng/inputnumber';



@NgModule({
  imports: [
    PanelModule,
    ButtonModule,
    ToolbarModule,
    RippleModule,
    TableModule,
    FormsModule,
    DialogModule,
    ConfirmDialogModule,
    SelectButtonModule,
    FileUploadModule,
    ToastModule,
    DropdownModule,
    MultiSelectModule,
    InputNumberModule
  ],
  exports: [
    PanelModule,
    ButtonModule,
    ToolbarModule,
    RippleModule,
    TableModule,
    FormsModule,
    DialogModule,
    ConfirmDialogModule,
    SelectButtonModule,
    FileUploadModule,
    ToastModule,
    DropdownModule,
    MultiSelectModule,
    InputNumberModule
  ]
})

export class PrimeNgModule {

}
