import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransferService } from 'src/app/services/transfer.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder, NgForm, FormGroup, Validators, FormControl, FormGroupDirective} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmTransferDialogService } from 'src/app/services/confirm-transfer-dialog.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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

  matcher = new MyErrorStateMatcher();

  FormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private transferService: TransferService,
    private router: Router,
    private toastrService: ToastrService,
    private confirmTransferDialogService: ConfirmTransferDialogService
  ) { }

  ngOnInit() {
    this.transferForm = this.formBuilder.group({
      firstAccountNumber: ['', [Validators.required, Validators.minLength(26), Validators.maxLength(26), Validators.pattern('^[0-9]*$')]],
      secondAccountNumber: ['', [Validators.required, Validators.minLength(26), Validators.maxLength(26), Validators.pattern('^[0-9]*$')]],
      money: ['', [Validators.required, Validators.pattern('^[0-9]*([.][0-9]{1,2})?$') ]],
    });
  }


  onSubmit() {
      this.accountNumberFrom = this.transferForm.value.firstAccountNumber;
      console.log(this.transferForm.value.firstAccountNumber);
      this.accountNumberTo = this.transferForm.value.secondAccountNumber;
      console.log(this.transferForm.value.secondAccountNumber);
      this.money = this.transferForm.value.money;
      console.log(this.transferForm.value.money);

      if (!this.transferForm.invalid) {
        this.confirmTransferDialogService.openConfirmTransferDialog(this.accountNumberFrom, this.accountNumberTo, this.money);
      } else {
        this.toastrService.error('BŁĄD! Nieprawidłowe dane. Nie można wykonać takiego przelewu.');
      }
  }

  cancel() {
    this.router.navigate(['/home/']);
  }
}
