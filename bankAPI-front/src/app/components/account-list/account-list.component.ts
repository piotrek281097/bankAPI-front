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

  constructor(private userService: AccountService) {
  }

  ngOnInit() {
    this.userService.getAllAccounts().subscribe(data => {
      this.accounts = data;
    });
  }

}
