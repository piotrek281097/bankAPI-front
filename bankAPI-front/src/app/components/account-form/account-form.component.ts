import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import {ToastrService} from 'ngx-toastr';
import {ErrorStateMatcher} from '@angular/material/core';

import {FormBuilder, NgForm, FormGroup, Validators, FormControl, FormGroupDirective} from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {

  accountForm: FormGroup;
  accountNumber: string;
  submitted = false;

  matcher = new MyErrorStateMatcher();

  FormControl = new FormControl('', [
    Validators.required,
  ]);



  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      accountNumber: ['', [Validators.required, Validators.minLength(26), Validators.maxLength(26), Validators.pattern('^[0-9]*$')]],
      money: ['', [Validators.required, Validators.pattern('^[0-9.]*$') ]],
      currency: ['', [Validators.required, Validators.pattern('[A-Z][A-Z][A-Z]')]],
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


      if (!this.accountForm.invalid) {
        this.accountService.save(accountToAdd);
      } else {
        this.toastrService.error('BŁĄD! Nieprawidłowe dane. Nie można dodać takiego rachunku.');
      }

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
