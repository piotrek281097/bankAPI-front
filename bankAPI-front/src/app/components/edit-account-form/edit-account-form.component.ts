import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-edit-account-form',
  templateUrl: './edit-account-form.component.html',
  styleUrls: ['./edit-account-form.component.css']
})
export class EditAccountFormComponent implements OnInit {

  accountNumber: string;
  accountEditForm: FormGroup;
  money: number;
  currency: string;
  ownerName: string;
  accountReadFromDatabase: Account;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.accountNumber = this.route.snapshot.paramMap.get('accountNumber');
    console.log("edit component " + this.accountNumber);

    this.accountService.findByNumber(this.accountNumber).subscribe(data => {
      this.accountReadFromDatabase = data;
    });

    /*
    setTimeout( () => {
      this.moneyUpdatedAccount = this.accountReadFromDatabase[0].money;
      this.currencyUpdatedAccount = this.accountReadFromDatabase[0].currency;
      this.ownerNameUpdatedAccount = this.accountReadFromDatabase[0].ownerName;

    }, 1000);
    */

    this.accountEditForm = this.formBuilder.group({
      money: ['', [Validators.required ]],
      currency: ['', [Validators.pattern('[A-Z][A-Z][A-Z]')]],
      ownerName: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  onSubmit() {
      const accountToUpdate: Account = new Account();

      console.log(this.accountNumber);
      accountToUpdate.accountNumber = this.accountNumber;
      console.log(this.accountEditForm.value.money);
      accountToUpdate.money = this.accountEditForm.value.money;
      console.log(this.accountEditForm.value.currency);
      accountToUpdate.currency = this.accountEditForm.value.currency;
      console.log(this.accountEditForm.value.ownerName);
      accountToUpdate.ownerName = this.accountEditForm.value.ownerName;
      console.log(accountToUpdate);

      this.accountService.updateAccount(this.accountNumber, accountToUpdate);

      // this.accountService.save(accountToUpdate);

      setTimeout( () => {
        this.router.navigate(['/accounts/']);
      }, 1000);

  }

  cancel() {
    this.router.navigate(['/accounts/']);
  }
}

