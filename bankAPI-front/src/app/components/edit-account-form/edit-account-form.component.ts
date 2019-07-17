import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import {ToastrService} from 'ngx-toastr';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-account-form',
  templateUrl: './edit-account-form.component.html',
  styleUrls: ['./edit-account-form.component.css']
})
export class EditAccountFormComponent implements OnInit {

  accountNumber: string;
  accountId: number;
  accountEditForm: FormGroup;
  money: number;
  currency: string;
  ownerName: string;
  accountReadFromDatabase: Account;
  isAccountFromDataBaseLoaded: boolean = false;

  matcher = new MyErrorStateMatcher();

  FormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.accountId = +this.route.snapshot.paramMap.get('accountId');

    this.accountService.findByAccountId(+this.accountId).subscribe(data => {
      this.accountReadFromDatabase = data;
      this.isAccountFromDataBaseLoaded = true;
      this.accountNumber = this.accountReadFromDatabase.accountNumber;
    });

    this.accountEditForm = this.formBuilder.group({
      money: ['', [Validators.required, Validators.pattern('^[0-9]*([.][0-9]{1,2})?$') ]],
      currency: ['', [Validators.required, Validators.pattern('[A-Z][A-Z][A-Z]')]],
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

      if (!this.accountEditForm.invalid) {
        this.accountService.updateAccount(this.accountId, accountToUpdate);
      } else {
        this.toastrService.error('BŁĄD! Nieprawidłowe dane. Nie można edytować rachunku.');
      }
  }

  cancel() {
    this.router.navigate(['/accounts/']);
  }
}

