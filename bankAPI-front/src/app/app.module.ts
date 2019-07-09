import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountService } from 'src/app/services/account.service';
import { AccountFormComponent } from 'src/app/components/account-form/account-form.component';
import { TransferFormComponent } from './components/transfer-form/transfer-form.component';
import { TransferService } from './services/transfer.service';
import { TransferDetailsComponent } from './components/transfer-details/transfer-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AccountListComponent,
    AccountFormComponent,
    TransferFormComponent,
    TransferDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [AccountService, TransferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
