import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TransferService } from 'src/app/services/transfer.service';
import { Transfer } from 'src/app/models/transfer';

@Component({
  selector: 'app-transfer-details',
  templateUrl: './transfer-details.component.html',
  styleUrls: ['./transfer-details.component.css']
})
export class TransferDetailsComponent implements OnInit {

  transfersForOneAccountNumber: Transfer[];
  accountNumber: string;

  constructor(
    private route: ActivatedRoute,
    private transferService: TransferService
  ) {}

  ngOnInit() {
    this.accountNumber = this.route.snapshot.paramMap.get('accountNumber');

    this.transferService.getTransfersByAccountNumber(this.route.snapshot.paramMap.get('accountNumber')).subscribe(data => {
    this.transfersForOneAccountNumber = data;
  });
  }

}
