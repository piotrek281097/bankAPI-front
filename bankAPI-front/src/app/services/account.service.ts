import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from '../models/account';
import { Observable } from 'rxjs';

@Injectable()
export class AccountService {

  private accountsUrl: string;
  private headersObject: HttpHeaders;

  prepareHeader() {
    this.headersObject = new HttpHeaders();
    this.headersObject.append('Content-Type', 'application/json');
    this.headersObject.append('Authorization', 'Basic ' + btoa('admin1:password1'));
  }

  constructor(private http: HttpClient) {
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

}
