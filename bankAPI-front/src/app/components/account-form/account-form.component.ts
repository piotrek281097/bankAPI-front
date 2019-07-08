import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {

  accountNumber: string;
  money: number;
  currency: string;
  ownerName: string;

  constructor(private route: ActivatedRoute, private accountService: AccountService) { }

ngOnInit() {

}


addAccount(): void {
  const accountToAdd = new Account(
    //this.accountNumber,
    //this.money,
    //this.currency,
    //this.ownerName
    '72345678901234567890123456',
    777.00,
    'USD',
    'OwnerFront1'
  );

  console.log('addAccount');

  this.accountService.save(accountToAdd);
  }
}
