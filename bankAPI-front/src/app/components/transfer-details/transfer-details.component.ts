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
  transfersOut: Transfer[];
  transfersIn: Transfer[];
  transfersToShow: Transfer[];
  titleTransfers: string = "Wszystkie";
  accountNumber: string;
  accountReadFromDatabase: Account;
  conditionAreTransfers: boolean = false;
  conditionAreTransfersOut: boolean = false;
  conditionAreTransfersIn: boolean = false;
  conditionAreTransfersToShow: boolean = false;

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

      this.transfersToShow = this.transfersForOneAccountNumber;
    });

    this.transferService.getTransfersOutByAccountNumber(this.route.snapshot.paramMap.get('accountNumber')).subscribe(data => {
      this.transfersOut = data;
      if (this.transfersOut.length > 0) {
        this.conditionAreTransfersOut = true;
      }
    });

    this.transferService.getTransfersInByAccountNumber(this.route.snapshot.paramMap.get('accountNumber')).subscribe(data => {
      this.transfersIn = data;
      if (this.transfersIn.length > 0) {
        this.conditionAreTransfersIn = true;
      }
    });

    this.transfersToShow = this.transfersForOneAccountNumber;
  }

  showAllTransfers() {
    console.log("All");
    this.titleTransfers = "Wszystkie";
    this.transfersToShow = this.transfersForOneAccountNumber;
    this.conditionAreTransfersToShow = this.conditionAreTransfersIn;
  }

  showOutTransfers() {
    console.log("Out");
    this.titleTransfers = "Wychodzące";
    this.transfersToShow = this.transfersOut;
    this.conditionAreTransfers = this.conditionAreTransfersOut;
  }

  showInTransfers() {
    console.log("In");
    this.titleTransfers = "Przychodzące";
    this.transfersToShow = this.transfersIn;
    this.conditionAreTransfers = this.conditionAreTransfersIn;
  }

}
