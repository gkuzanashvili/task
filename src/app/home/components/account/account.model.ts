

export class AccountModel {
  accountNumber: number;
  clientNumber: number;
  accountType: AccountTypeModel;
  currency: CurrencyModel;
  // accountStatus: AccountStatusType;
}

export class CurrencyModel {
  id: number;
  value: string;
}

export class AccountTypeModel {
  id: number;
  value: string;
}

// export interface AccountStatusType {
//   id: number;
//   value: string;
// }
