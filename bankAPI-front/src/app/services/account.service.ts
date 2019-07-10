import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from '../models/account';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AccountService {

  private accountsUrl: string;
  private headersObject: HttpHeaders;

  prepareHeader() {
    this.headersObject = new HttpHeaders();
    this.headersObject.append('Content-Type', 'application/json');
    this.headersObject.append('Authorization', 'Basic ' + btoa('admin1:password1'));
  }

  constructor(private http: HttpClient, private router: Router) {
    this.accountsUrl = 'http://localhost:8081/api/accounts/';
  }

  public getAllAccounts(): Observable<Account[]> {
    this.prepareHeader();
    return this.http.get<Account[]>('/api/accounts', {headers: this.headersObject});
  }


  public save(account: Account) {
    this.prepareHeader();

    return this.http.post('/api/accounts/add', account, {headers: this.headersObject}).subscribe(a => a);
  }

  public delete(accountNumber: string) {
    this.prepareHeader();

    this.http.delete('/api/accounts/delete/' + accountNumber, {headers: this.headersObject}).subscribe(a => a);
  }

  public findByNumber(accountNumber: string): Observable<Account> {
      this.prepareHeader();

      return this.http.get<Account>('/api/accounts/findByNumber/' + accountNumber, {headers: this.headersObject});
  }

  public updateAccount(accountNumber: string, account: Account) {
      this.prepareHeader();

      return this.http.put('/api/accounts/update/' + accountNumber, account, {headers: this.headersObject}).subscribe();
  }

}
