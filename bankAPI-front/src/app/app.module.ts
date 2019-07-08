import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountService } from 'src/app/services/account.service';
import { AccountFormComponent } from 'src/app/components/account-form/account-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AccountListComponent,
    AccountFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,    // <-- Right here
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
