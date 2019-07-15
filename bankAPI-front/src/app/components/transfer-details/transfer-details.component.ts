import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransferService } from 'src/app/services/transfer.service';
import { Transfer } from 'src/app/models/transfer';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-transfer-details',
  templateUrl: './transfer-details.component.html',
  styleUrls: ['./transfer-details.component.css']
})
export class TransferDetailsComponent implements OnInit {

  transfersForOneAccountNumber: Transfer[];
  accountNumber: string;
  accountReadFromDatabase: Account;
  conditionAreTransfers: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private transferService: TransferService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.accountNumber = this.route.snapshot.paramMap.get('accountNumber');

    this.accountService.findByNumber(this.accountNumber).subscribe(data => {
      this.accountReadFromDatabase = data;
    });

    this.transferService.getTransfersByAccountNumber(this.route.snapshot.paramMap.get('accountNumber')).subscribe(data => {
    this.transfersForOneAccountNumber = data;
    if (this.transfersForOneAccountNumber.length > 0) {
      this.conditionAreTransfers = true;
    }
  });
  }

}
