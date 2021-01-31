export class AccountModel {
  accountNumber: number;
  clientNumber: number;
  accountType: number;
  currency: string;
  accountStatus: string;
}

export class CurrencyModel {
  label: string;
  value: string;
}

export class AccountTypeModel {
  label: string;
  value: number;
}

export interface AccountStatusType {
  label: string;
  value: string;
}
