import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {RouterModule} from '@angular/router';
import {APP_ROUTES} from './app.routes';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import { ClientsComponent } from './home/components/clients/clients.component';
import { AccountComponent } from './home/components/account/account.component';
import {PrimeNgModule} from './primeng-module';
import {ConfirmationService} from 'primeng/api';
import {GenderPipe} from './pipes/gender-pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientsComponent,
    AccountComponent,
    GenderPipe
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    BrowserModule,
    BrowserAnimationsModule,
    PrimeNgModule
  ],
  providers: [
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
