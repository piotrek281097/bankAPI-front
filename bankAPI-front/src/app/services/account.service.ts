import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Account } from '../models/account';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AccountService {

  private accountsUrl: string;
  private headersObject: HttpHeaders;

  prepareHeader() {
    this.headersObject = new HttpHeaders();
    this.headersObject = this.headersObject.append('Content-Type', 'application/json');
    this.headersObject = this.headersObject.append('Authorization', 'Basic ' + btoa('admin1:password1'));
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastrService: ToastrService) {
    this.accountsUrl = 'http://localhost:8081/api/accounts/';
  }

  public getAllAccounts(): Observable<Account[]> {
    this.prepareHeader();
    return this.http.get<Account[]>('/api/accounts', {headers: this.headersObject});
  }


  public save(account: Account) {
    this.prepareHeader();

    return this.http.post('/api/accounts/add', account, {headers: this.headersObject}).toPromise()
    .then((res: Response) => {
      this.toastrService.success('Dodano rachunek');
      setTimeout( () => {
        this.router.navigate(['/accounts/']);
      }, 3000);
    }
    )
    .catch(error => {
      if (error instanceof HttpErrorResponse && (error.status === 404 || error.status === 409 || error.status === 400)) {
        if (error.status === 409) {
          this.toastrService.error('BŁĄD! Rachunek o takim numerze już istnieje! Nie dodano rachunku');
        } else if (error.status === 404) {
          this.toastrService.error('Nie znaleziono takiej waluty! Nie dodano rachunku');
        } else if (error.status === 400) {
          this.toastrService.error('BŁĄD! Nieznany błąd. Sprawdź jeszcze raz dane. Nie dodano rachunku');
        }
      }
    })
    .catch((res: Response) => {
      this.toastrService.success('Nieznany błąd! Nie dodano rachunku');
    });
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

      return this.http.put('/api/accounts/update/' + accountNumber, account, {headers: this.headersObject}).toPromise()
      .then((res: Response) => {
        this.toastrService.success('Edytowano rachunek');
        setTimeout( () => {
          this.router.navigate(['/accounts/']);
        }, 3000);
      }
      )
      .catch(error => {
        if (error instanceof HttpErrorResponse && (error.status === 500 )) {
          if (error.status === 500) {
            this.toastrService.error('Nie znaleziono takiej waluty! Nie edytowano rachunku');
          }
        }
      })
      .catch((res: Response) => {
        this.toastrService.success('Nieznany błąd! Nie edytowano rachunku');
      });
  }

}
