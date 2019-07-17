import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TransferService } from 'src/app/services/transfer.service';

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
    private transferService: TransferService
  ) { }

  ngOnInit() {
  }

  accept() {
    this.dialogRef.close();
    this.transferService.makeTransfer(this.data.accountNumberFrom, this.data.accountNumberTo, this.data.money);
    console.log("1 " + this.data.accountNumberFrom);
    console.log("2 " + this.data.accountNumberTo);
    setTimeout( () => {
      window.location.reload();
    }, 3000);
  }

  cancel() {
    this.dialogRef.close();
  }

}
