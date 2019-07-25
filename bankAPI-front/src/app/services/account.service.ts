import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Account } from '../models/account';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExternalAccount } from '../models/external-account';

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
    return this.http.get<Account[]>('https://bankrestapicomarch.herokuapp.com/accounts', {headers: this.headersObject});
  }

  public getAllAccountsFromMagda(): Observable<ExternalAccount[]> {
    this.prepareHeader();
    return this.http.get<ExternalAccount[]>('https://bankrestapicomarch.herokuapp.com/accounts-external', {headers: this.headersObject});
  }

  public save(account: Account) {
    this.prepareHeader();

    return this.http.post('https://bankrestapicomarch.herokuapp.com/accounts/add', account, {headers: this.headersObject}).toPromise()
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

  public delete(accountId: number) {
    this.prepareHeader();

    this.http.put('/api/accounts/delete/' + accountId, {headers: this.headersObject}).subscribe(a => a);
  }

  public findByAccountId(accountId: number): Observable<Account> {
    this.prepareHeader();

    return this.http.get<Account>('/api/accounts/findAccountByAccountId/' + accountId, {headers: this.headersObject});
}

  public updateAccount(accountId: number, account: Account) {
      this.prepareHeader();

      return this.http.put('/api/accounts/update/' + accountId, account, {headers: this.headersObject}).toPromise()
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


  public findByOwnerName(ownerName: string): Observable<Account[]> {
    this.prepareHeader();

    return this.http.get<Account[]>('/api/accounts/findByOwnerName/' + ownerName, {headers: this.headersObject})
    .pipe(
      catchError(err => {
        if (err.status === 404) {
          this.toastrService.error('Nie znaleziono rachunku z takim właścicielem');
          return throwError(err);
        }
      })
    )
  }
}



