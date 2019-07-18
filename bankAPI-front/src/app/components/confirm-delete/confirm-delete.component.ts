import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  accountId: number;
  accountNumber: string;
  money: number;
  currency: string;
  ownerName: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data,
    private dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }

  delete() {
    this.dialogRef.close();
    this.accountService.delete(this.data.accountId);
    setTimeout( () => {
       window.location.reload();
    }, 1000);
  }

  cancel() {
    this.dialogRef.close();
  }

}
