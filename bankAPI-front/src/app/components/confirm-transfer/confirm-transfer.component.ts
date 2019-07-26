import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TransferService } from 'src/app/services/transfer.service';
import { ExternalTransferService } from 'src/app/services/external-transfer.service';

@Component({
  selector: 'app-confirm-transfer',
  templateUrl: './confirm-transfer.component.html',
  styleUrls: ['./confirm-transfer.component.css']
})
export class ConfirmTransferComponent implements OnInit {

  accountNumberFrom: string;
  accountNumberTo: string;
  moneyToTransfer: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data,
    private dialogRef: MatDialogRef<ConfirmTransferComponent>,
    private externalTransferService: ExternalTransferService,
    private transferService: TransferService
  ) { }

  ngOnInit() {
  }

  accept() {
    this.dialogRef.close();

    if (this.data.bankName === undefined) {
      this.transferService.makeTransfer(this.data.accountNumberFrom, this.data.accountNumberTo, this.data.money);
      setTimeout( () => {
        window.location.reload();
      }, 7000);
    } else {
    this.externalTransferService.makeExternalTransfer(this.data.accountNumberFrom, this.data.accountNumberTo,
      this.data.money, this.data.bankName, this.data.email);
    setTimeout( () => {
      window.location.reload();
    }, 3000);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
