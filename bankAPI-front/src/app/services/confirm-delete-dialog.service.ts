import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDeleteComponent } from '../components/confirm-delete/confirm-delete.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDeleteDialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDeleteDialog(accountId: number, accountNumber: string, money: number, currency: string, ownerName: string) {
   return this.dialog.open(ConfirmDeleteComponent, {
      panelClass: 'dialog-container',
      disableClose: true,
      position: { top: '10px' },
      data : {
        accountId : accountId,
        accountNumber : accountNumber,
        money : money,
        currency : currency,
        ownerName : ownerName,
      }
    });
  }
}
