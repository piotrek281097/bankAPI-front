import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  accounts: Account[];

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.accountService.getAllAccounts().subscribe(data => {
      this.accounts = data;
    });
  }

  onClickRow(accountNumber) {
    console.log("dziala " + accountNumber);
  }

  editAccount(accountNumber: string) {
    console.log("edit " + accountNumber);
  }

  deleteAccount(accountNumber: string) {
    console.log("delete " + accountNumber);
    this.accountService.delete(accountNumber);
  }

}
