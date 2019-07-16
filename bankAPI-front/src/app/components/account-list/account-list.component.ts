import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  accounts: Account[];
  searchText: any = { accountNumber: '', money: '', currency: '', ownerName: ''};

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.accountService.getAllAccounts().subscribe(data => {
      this.accounts = data;
    });
  }

  onClickField(accountNumber: string) {
    console.log("onClickField dziala " + accountNumber);
    this.router.navigate(['/transferdetails/' + accountNumber]);
  }

  editAccount(accountNumber: string) {
    console.log("edit " + accountNumber);
    this.router.navigate(['/edit-account/' + accountNumber]);
  }

  deleteAccount(accountNumber: string) {
    console.log("delete " + accountNumber);
    this.accountService.delete(accountNumber);
    window.location.reload();
  }

}
