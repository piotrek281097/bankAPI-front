import { Component, OnInit, Input, HostListener, OnDestroy } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { ConfirmDeleteDialogService } from 'src/app/services/confirm-delete-dialog.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit, OnDestroy{

  @Input() isHomeComponentLoaded: boolean;

  accounts: Account[];
  searchText: any = { accountNumber: '', money: '', currency: '', ownerName: ''};

  control = new FormControl();
  owners: string[] = [];
  filteredAccounts: Observable<string[]>;
  isButtonShowAllAccountsVisible: boolean;
  inputOwnerName: string;
  isAccountListComponentLoaded: boolean;

  config: any;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private confirmDeleteDialogService: ConfirmDeleteDialogService

  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0,
    };

    this.isButtonShowAllAccountsVisible = false;
    this.isAccountListComponentLoaded = false;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === 13) {
      if (this.isAccountListComponentLoaded === true) {
          console.log("enter");
          console.log(this.inputOwnerName);
          this.showChosenAccount(this.inputOwnerName);
      }
    }
  }

  ngOnInit() {
    this.accountService.getAllAccounts().subscribe(data => {
      this.accounts = data;

      for (const account of this.accounts) {
        this.owners.push(account.ownerName);
      }

      this.filteredAccounts = this.control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
        );

      this.config.totalItems = this.accounts.length;
    });

    this.isAccountListComponentLoaded = true;
}

ngOnDestroy() {
  this.isAccountListComponentLoaded = false;
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
    this.router.navigate(['/transferdetails/' + accountId]);
  }

  editAccount(accountId: number) {
    console.log('edit ' + accountId);
    this.router.navigate(['/edit-account/' + accountId]);
  }

  deleteAccount(accountId: number, accountNumber: string, money: number, currency: string, ownerName: string) {
    console.log('delete ' + accountId);
    this.confirmDeleteDialogService.openConfirmDeleteDialog(accountId, accountNumber, money, currency, ownerName);
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
