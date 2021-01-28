import {NgModule} from '@angular/core';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {RippleModule} from 'primeng/ripple';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';



@NgModule({
  imports: [
    PanelModule,
    ButtonModule,
    ToolbarModule,
    RippleModule,
    TableModule,
    InputTextModule,
    FormsModule,
    DialogModule,
    ConfirmDialogModule,
  ],
  exports: [
    PanelModule,
    ButtonModule,
    ToolbarModule,
    RippleModule,
    TableModule,
    InputTextModule,
    FormsModule,
    DialogModule,
    ConfirmDialogModule,
  ]
})

export class PrimeNgModule {

}
