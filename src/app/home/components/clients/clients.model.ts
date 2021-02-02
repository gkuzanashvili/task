import {AccountModel} from './account-modal/account.model';

export class ClientModel {
  id: number;
  pin: number;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  image: string;
  legalAddress = new AddressModel();
  actualAddress = new AddressModel();
  accounts = new Array<AccountModel>();
  uploadedImage: string;

}

export class AddressModel {
  country: string;
  city: string;
  address: string;
}
