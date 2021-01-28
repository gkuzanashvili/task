import {AccountModel} from '../account/account.model';

export class ClientModel {
  id: number;
  pin: number;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  image: string;
  legalAddress: AddressModel;
  actualAddress: AddressModel;
  account: Array<AccountModel>;
  uploadedImage: string;

}

export class AddressModel {
  country: string;
  city: string;
  address: string;
}

// export class Gender {
//   id: number;
//   value: string;
// }
