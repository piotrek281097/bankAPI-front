import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  titleTransfers: string;
  accountNumber: string;
  accountId: number;
  accountReadFromDatabase: Account;
  conditionAreTransfers: boolean;
  conditionAreTransfersOut: boolean;
  conditionAreTransfersIn: boolean;
  conditionAreTransfersToShow: boolean;
  isButtonCancelClicked: boolean;

  constructor(
    private route: ActivatedRoute,
    private transferService: TransferService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.conditionAreTransfers = false;
    this.conditionAreTransfersOut = false;
    this.conditionAreTransfersIn = false;
    this.conditionAreTransfersToShow = false;
    this.isButtonCancelClicked = false;
    this.titleTransfers = 'Wszystkie';
  }

  ngOnInit() {
    this.accountId = +this.route.snapshot.paramMap.get('accountId');

    this.accountService.findByAccountId(+this.route.snapshot.paramMap.get('accountId')).subscribe(data => {
      this.accountReadFromDatabase = data;
      this.accountNumber = this.accountReadFromDatabase.accountNumber;
    });

    this.transferService.getTransfersByAccountId(+this.route.snapshot.paramMap.get('accountId')).subscribe(data => {
      this.transfersForOneAccountNumber = data;
      if (this.transfersForOneAccountNumber.length > 0) {
        this.conditionAreTransfers = true;
      }
      this.transfersToShow = this.transfersForOneAccountNumber;
    });


    this.transferService.getTransfersOutByAccountId(+this.route.snapshot.paramMap.get('accountId')).subscribe(data => {
      this.transfersOut = data;
      if (this.transfersOut.length > 0) {
        this.conditionAreTransfersOut = true;
      }
    });

    this.transferService.getTransfersInByAccountId(+this.route.snapshot.paramMap.get('accountId')).subscribe(data => {
      this.transfersIn = data;
      if (this.transfersIn.length > 0) {
        this.conditionAreTransfersIn = true;
      }
    });

  }
  showAllTransfers() {
    this.titleTransfers = 'Wszystkie';
    this.transfersToShow = this.transfersForOneAccountNumber;
    this.conditionAreTransfersToShow = this.conditionAreTransfersIn;
  }

  showOutTransfers() {
    this.titleTransfers = 'Wychodzące';
    this.transfersToShow = this.transfersOut;
    this.conditionAreTransfers = this.conditionAreTransfersOut;
  }

  showInTransfers() {
    this.titleTransfers = 'Przychodzące';
    this.transfersToShow = this.transfersIn.filter(transfer => transfer.transferStatus !== 'CANCELED');
    this.conditionAreTransfers = this.conditionAreTransfersIn;
  }

   cancelTransfer(transferId: number) {
      this.transferService.cancelTransfer(transferId);
      this.isButtonCancelClicked = true;

      setTimeout( () => {
        window.location.reload();
      }, 3000);
    }
  }


