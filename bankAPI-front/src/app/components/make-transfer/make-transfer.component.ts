import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.css']
})
export class MakeTransferComponent implements OnInit {

  transferType: string;

  constructor() {
    this.transferType = 'Zwykły';
  }

  ngOnInit() {
  }

  showTransferFormComponent() {
    this.transferType = 'Zwykły';
  }

  showTransferExternalFormComponent() {
    this.transferType = 'Zewnętrzny';
  }

}
