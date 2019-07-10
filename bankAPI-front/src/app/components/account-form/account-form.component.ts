import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import {ToastrService} from 'ngx-toastr';

import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {

  accountForm: FormGroup;
  accountNumber: string;
  money: number;
  currency: string;
  ownerName: string;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router) { }

  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      accountNumber: ['', [Validators.required, Validators.minLength(26), Validators.maxLength(26)]],
      money: ['', [Validators.required ]],
      currency: ['', [Validators.pattern('[A-Z][A-Z][A-Z]')]],
      ownerName: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }


  onSubmit() {
      const accountToAdd: Account = new Account();

      console.log(this.accountForm.value.accountNumber);
      accountToAdd.accountNumber = this.accountForm.value.accountNumber;
      console.log(this.accountForm.value.money);
      accountToAdd.money = this.accountForm.value.money;
      console.log(this.accountForm.value.currency);
      accountToAdd.currency = this.accountForm.value.currency;
      console.log(this.accountForm.value.ownerName);
      accountToAdd.ownerName = this.accountForm.value.ownerName;
      console.log(accountToAdd);

      //this.accountService.save(accountToAdd);

      setTimeout( () => {
        this.router.navigate(['/accounts/']);
      }, 1000);
  }

  cancel() {
    this.router.navigate(['/home/']);
  }
}
/*
addAccount(): void {
  const accountToAdd = new Account(
    this.accountNumber,
    this.money,
    this.currency,
    this.ownerName
  );

  console.log('addAccount');

  this.accountService.save(accountToAdd);
  }
}
*/
