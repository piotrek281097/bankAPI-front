import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import { ExternalAccount } from 'src/app/models/external-account';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  accounts: ExternalAccount[];

  constructor(
    private accountService: AccountService,
  ) {}


  ngOnInit() {
    this.accountService.getAllAccountsFromMagda().subscribe(data => {
      this.accounts = data;
    });
  }
}
