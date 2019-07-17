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

  config: any;

  constructor(
    private accountService: AccountService,
    private router: Router,

  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0,
    };
  }

  ngOnInit() {
    this.accountService.getAllAccounts().subscribe(data => {
      this.accounts = data;

      for (const account of this.accounts) {
        this.owners.push(account.ownerName);
      }

      console.log(this.owners);

      this.filteredAccounts = this.control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
        );

      this.config.totalItems = this.accounts.length;
    });
}

  pageChanged(event) {
    this.config.currentPage = event;
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.owners.filter(account => this._normalizeValue(account).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  onClickField(accountId: number) {
    console.log("onClickField dziala " + accountId);
    this.router.navigate(['/transferdetails/' + accountId]);
  }

  editAccount(accountId: number) {
    console.log("edit " + accountId);
    this.router.navigate(['/edit-account/' + accountId]);
  }

  deleteAccount(accountId: number) {
    console.log("delete " + accountId);
    this.accountService.delete(accountId);
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
    this.control.setValue('');
  }
}
