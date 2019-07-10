import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TransferService } from 'src/app/services/transfer.service';
import { Transfer } from 'src/app/models/transfer';

import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css']
})
export class TransferFormComponent implements OnInit {

  transferForm: FormGroup;

  accountNumberFrom: string;
  accountNumberTo: string;
  money: number;

  constructor(
    private formBuilder: FormBuilder,
    private transferService: TransferService) { }

  ngOnInit() {
    this.transferForm = this.formBuilder.group({
      firstAccountNumber: ['', [Validators.required, Validators.minLength(26), Validators.maxLength(26)]],
      secondAccountNumber: ['', [Validators.required, Validators.minLength(26), Validators.maxLength(26)]],
      money: ['', [Validators.required ]],
    });
  }


  onSubmit() {
      this.accountNumberFrom = this.transferForm.value.firstAccountNumber;
      console.log(this.transferForm.value.firstAccountNumber);
      this.accountNumberTo = this.transferForm.value.secondAccountNumber;
      console.log(this.transferForm.value.secondAccountNumber);
      this.money = this.transferForm.value.money;
      console.log(this.transferForm.value.money);

      this.transferService.makeTransfer(this.accountNumberFrom, this.accountNumberTo, this.money);

      window.location.reload();
  }
}
