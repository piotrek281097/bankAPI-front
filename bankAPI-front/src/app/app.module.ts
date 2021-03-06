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
import {MatNativeDateModule} from '@angular/material/core';

import { MatMenuModule, MatIconModule, MatTableModule } from "@angular/material";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { ToastrModule } from 'ngx-toastr';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ConfirmTransferComponent } from 'src/app/components/confirm-transfer/confirm-transfer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MatTabsModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmDeleteComponent } from 'src/app/components/confirm-delete/confirm-delete.component';
import { TransferExternalFormComponent } from 'src/app/components/transfer-external-form/transfer-external-form.component';
import { MakeTransferComponent } from 'src/app/components/make-transfer/make-transfer.component';
import { ExternalTransferService } from './services/external-transfer.service';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AccountListComponent,
    AccountFormComponent,
    TransferFormComponent,
    TransferDetailsComponent,
    EditAccountFormComponent,
    ConfirmTransferComponent,
    ConfirmDeleteComponent,
    TransferExternalFormComponent,
    MakeTransferComponent,

  ],
  imports: [
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    MatNativeDateModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    FilterPipeModule,
    MatAutocompleteModule,
    NgxPaginationModule,
    NgHttpLoaderModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      extendedTimeOut: 2000,
      easeTime: 500,
      resetTimeoutOnDuplicate: true
    }),
  ],
  entryComponents: [ConfirmTransferComponent, ConfirmDeleteComponent],
  providers: [AccountService, TransferService, ConfirmTransferComponent, ExternalTransferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
