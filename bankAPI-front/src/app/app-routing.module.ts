import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { TransferFormComponent } from './components/transfer-form/transfer-form.component';
import { TransferDetailsComponent } from './components/transfer-details/transfer-details.component';
import { EditAccountFormComponent } from './components/edit-account-form/edit-account-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'accounts', component: AccountListComponent },
  { path: 'add', component: AccountFormComponent },
  { path: 'maketransfer', component: TransferFormComponent },
  { path: 'transferdetails/:accountNumber', component: TransferDetailsComponent },
  { path: 'edit-account/:accountNumber', component: EditAccountFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
