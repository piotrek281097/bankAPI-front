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
import { EditAccountFormComponent } from './components/edit-account-form/edit-account-form.component';
import {
  MatMenuModule,
  MatIconModule,
  MatTableModule
} from "@angular/material";
import {
  BrowserAnimationsModule,
  NoopAnimationsModule
} from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AccountListComponent,
    AccountFormComponent,
    TransferFormComponent,
    TransferDetailsComponent,
    EditAccountFormComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      extendedTimeOut: 2000,
      easeTime: 500,
      resetTimeoutOnDuplicate: true
    })
  ],
  providers: [AccountService, TransferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
