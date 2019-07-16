import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from 'ngx-filter-pipe';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { Button } from 'protractor';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit{

  @Input() isHomeComponentLoaded: boolean;

  accounts: Account[];
  searchText: any = { accountNumber: '', money: '', currency: '', ownerName: ''};

  control = new FormControl();
  owners: string[] = [];
  filteredAccounts: Observable<string[]>;
  isButtonShowAllAccountsVisible: boolean = false;

  constructor(
    private accountService: AccountService,
    private router: Router,

  ) {}

  ngOnInit() {
    this.accountService.getAllAccounts().subscribe(data => {
      this.accounts = data;

      for (const account of this.accounts) {
        this.owners.push(account.ownerName);
      }

      console.log(this.owners);

      this.filteredAccounts = this.control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
        );
    });
}

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.owners.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
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

  showChosenAccount(owner: string) {
    console.log(owner);

    this.accountService.findByOwnerName(owner).subscribe(data => {
      this.accounts = data;
    });

    this.isButtonShowAllAccountsVisible = true;
  }

  showAllAccountAgain() {
    this.accountService.getAllAccounts().subscribe(data => {
      this.accounts = data;
    });

    this.isButtonShowAllAccountsVisible = false;
  }
}
