import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transfer } from '../models/transfer';
import { Observable } from 'rxjs';

@Injectable()
export class TransferService {

  private headersObject: HttpHeaders;

  prepareHeader() {
    this.headersObject = new HttpHeaders();
    this.headersObject.append('Content-Type', 'application/json');
    this.headersObject.append('Authorization', 'Basic ' + btoa('admin1:password1'));
  }

  constructor(private http: HttpClient) { }

  public getTransfersByAccountNumber(accountNumber: string): Observable<Transfer[]> {
    this.prepareHeader();
    return this.http.get<Transfer[]>('api/transfers/findByNumber/' + accountNumber, {headers: this.headersObject});
  }


  public makeTransfer(accountNumberFrom: string, accountNumberTo: string, money: number) {
    this.prepareHeader();

    return this.http.put('api/accounts/transfer/' + accountNumberFrom + '/' + accountNumberTo + '/' + money,
      {headers: this.headersObject}).subscribe(a => a);
  }
}
