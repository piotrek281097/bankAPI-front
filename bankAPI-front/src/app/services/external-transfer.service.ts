import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Transfer } from '../models/transfer';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExternalTransfer } from '../models/external-transfer';


@Injectable()
export class ExternalTransferService {

  private headersObject: HttpHeaders;
  private externalTransfer: ExternalTransfer;

  prepareHeader() {
    this.headersObject = new HttpHeaders();
    this.headersObject = this.headersObject.append('Content-Type', 'application/json');
    this.headersObject = this.headersObject.append('Authorization', 'Basic ' + btoa('admin1:password1'));
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastrService: ToastrService) { }

  public makeExternalTransfer(accountNumberFrom: string, accountNumberTo: string, money: number, bankName: string, email: string) {
    this.prepareHeader();

    this.externalTransfer = new ExternalTransfer();

    this.externalTransfer.amount = money;
    this.externalTransfer.bankName = bankName;
    this.externalTransfer.currency = '';
    this.externalTransfer.externalAccount = accountNumberFrom;
    this.externalTransfer.toAccount = accountNumberTo;


    if (accountNumberFrom === accountNumberTo) {
      this.toastrService.error('BŁĄD! Nr rachunku nadawcy i odbiorcy nie może być taki sam.');
    } else {
      this.http.post('api/accounts/transfer-external/' + email, this.externalTransfer, {headers: this.headersObject})
      .toPromise()
        .then((res: Response) => {
          this.toastrService.success('Zlecono przelew zewnętrzny');
        }
        )
        .catch(error => {
          if (error instanceof HttpErrorResponse && (error.status === 404 || error.status === 409 || error.status === 400)) {
            if (error.status === 404) {
              this.toastrService.error('Nie znaleziono nr konta! Nie wykonano przelewu');
            } else if (error.status === 409) {
              this.toastrService.error('Za mało środków na koncie! Nie wykonano przelewu');
            } else if (error.status === 400) {
              this.toastrService.error('BŁĄD! Nieznany błąd. Sprawdź jeszcze raz dane. Nie wykonano przelewu');
            }
          }
        })
        .catch((res: Response) => {
          this.toastrService.success('Nieznany błąd! Nie wykonano przelewu');
        });
      }
  }

  public cancelTransfer(transferId: number) {
    this.http.put('api/transfers/cancel/' + transferId, {headers: this.headersObject})
    .toPromise()
      .then((res: Response) => {
        this.toastrService.success('Anulowano przelew');
    }
    )
    .catch(error => {
      if (error instanceof HttpErrorResponse && (error.status === 409 || error.status === 404)) {
        if (error.status === 404) {
          this.toastrService.error('Nie znaleziono przelewu w bazie!');
        } else if (error.status === 409) {
          this.toastrService.error('Przelew został już wykonany! Nie można anulowac');
        }
      }
    })
    .catch((res: Response) => {
      this.toastrService.success('Nieznany błąd! Nie anulowano przelewu');
    });
  }
}
