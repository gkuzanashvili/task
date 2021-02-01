import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {RouterModule} from '@angular/router';
import {APP_ROUTES} from './app.routes';
import { ClientsComponent } from './home/components/clients/clients.component';
import { AccountComponent } from './home/components/clients/account-modal/account.component';
import {PrimeNgModule} from './primeng-module';
import {ConfirmationService, MessageService} from 'primeng/api';
import {GenderPipe} from './pipes/gender-pipe';
import { ClientModalComponent } from './home/components/clients/client-modal/client-modal.component';
import {InputModule} from './shared-ui/input/input.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AddressModule} from './shared-ui/address/address.module';
import { AccountViewComponent } from './home/components/clients/account-modal/account-view/account-view.component';
import {ValidatorModule} from './shared-ui/validator/validator.module';
import {ExactLengthValidator} from './validators/exact-length-validator.service';
import {PhoneNumberValidator} from './validators/phone-number-validator';
import {GeoEnRegexValidator} from './validators/geo-en-regex-validator';
import {AccountResolver} from './home/components/clients/account-modal/account.resolver';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientsComponent,
    AccountComponent,
    GenderPipe,
    ClientModalComponent,
    AccountViewComponent,
  ],
    imports: [
        HttpClientModule,
        RouterModule.forRoot(APP_ROUTES),
        BrowserModule,
        BrowserAnimationsModule,
        PrimeNgModule,
        InputModule,
        ReactiveFormsModule,
        AddressModule,
        ValidatorModule
    ],
  providers: [
    ConfirmationService,
    MessageService,
    ExactLengthValidator,
    PhoneNumberValidator,
    GeoEnRegexValidator
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
