import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmTransferComponent } from 'src/app/components/confirm-transfer/confirm-transfer.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmTransferDialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmTransferDialog(accountNumberFrom, accountNumberTo, money) {
   return this.dialog.open(ConfirmTransferComponent, {
      panelClass: 'dialog-container',
      disableClose: true,
      position: { top: '10px' },
      data : {
        accountNumberFrom : accountNumberFrom,
        accountNumberTo : accountNumberTo,
        money : money
      }
    });
  }
}
