
export class Account {
  accountId: number;
  accountNumber: string;
  money: number;
  currency: string;
  ownerName: string;

  constructor(accountNumber, money, currency, ownerName) {
    this.accountNumber = accountNumber;
    this.money = money;
    this.currency = currency;
    this.ownerName = ownerName;
  }
}

