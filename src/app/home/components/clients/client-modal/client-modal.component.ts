import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AddressModel, ClientModel} from '../clients.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GenderPipe} from '../../../../pipes/gender-pipe';
import {ExactLengthValidator} from '../../../../validators/exact-length-validator.service';
import {PhoneNumberValidator} from '../../../../validators/phone-number-validator';
import {GeoEnRegexValidator} from '../../../../validators/geo-en-regex-validator';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.css']
})
export class ClientModalComponent implements OnInit {
  client = new ClientModel();
  submitted = false;

  @Output() newClient = new EventEmitter<ClientModel>();

  public gender = [
    { label: new GenderPipe().transform('F'), value: 'F' },
    { label: new GenderPipe().transform('M'), value: 'M' }
  ];
  clientForm: FormGroup;
  legalAddress: FormGroup;
  actualAddress: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public phoneNumberValidator: PhoneNumberValidator,
    public numberExactLengthValidator: ExactLengthValidator,
    public geoEnRegexValidator: GeoEnRegexValidator
  ) { }

  ngOnInit(): void {
    this.initForm(this.client);
     // this.clientForm.disable({onlySelf: true, emitEvent: true});
  }

  initForm(client: ClientModel) {
    this.submitted = false;
    this.client = client;
    this.clientForm = this.formBuilder.group({
      id: new FormControl(this.client.id),
      image: new FormControl(this.client.image),
      pin: new FormControl(this.client.pin, [Validators.required, this.numberExactLengthValidator.validate(11)]),
      firstName: new FormControl(this.client.firstName,
          [Validators.required,
                       this.geoEnRegexValidator.validate(),
                       Validators.maxLength(50),
                       Validators.minLength(2)]),
      lastName: new FormControl(this.client.lastName,
         [Validators.required,
                      this.geoEnRegexValidator.validate(),
                      Validators.maxLength(50),
                      Validators.minLength(2)]),
      phoneNumber:  new FormControl(this.client.phoneNumber, [Validators.required, this.phoneNumberValidator.validate()]),
      gender: new FormControl(this.client.gender)
    });
    this.legalAddress = this.initAddressForm( this.client.legalAddress);
    this.actualAddress = this.initAddressForm( this.client.actualAddress);
  }

  initAddressForm(address: AddressModel): FormGroup {
    return this.formBuilder.group({
      country: new FormControl(address.country, Validators.required),
      city: new FormControl(address.city, Validators.required),
      address: new FormControl(address.address, Validators.required),
    });

  }

  onSave() {
    this.submitted = true;
    console.log(this.clientForm.get('firstName').errors , 'firstName');
    console.log(this.clientForm.get('lastName').errors , 'lastName');
    this.client = this.clientForm.value;
    this.client.legalAddress = this.legalAddress.value;
    this.client.actualAddress = this.actualAddress.value;
    if ( this.isValid()) {
      this.newClient.emit(this.client);
    }
  }

  // clare() {
  //   if (this.clientForm && this.clientForm.controls) {
  //     Object.keys(this.clientForm.controls).forEach(key => {
  //       this.clientForm.get(key).setValue('');
  //     });
  //   }
  //   if (this.legalAddress && this.legalAddress.controls) {
  //     Object.keys(this.legalAddress.controls).forEach(key => {
  //       this.legalAddress.get(key).setValue('');
  //     });
  //   }
  //   if (this.actualAddress && this.actualAddress.controls) {
  //     Object.keys(this.actualAddress.controls).forEach(key => {
  //       this.actualAddress.get(key).setValue('');
  //     });
  //   }
  // }
  isValid() {
    return this.clientForm.valid && this.legalAddress.valid && this.actualAddress.valid;
  }
  // getErrors(fieldName) {
  //   return this.clientForm.get(fieldName).errors ?  this.clientForm.get(fieldName)['errors'] : [];
  // }
  onUpload(event) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event.files[0]);
    console.log( fileReader);
    fileReader.onload = (e: any) => {
        this.clientForm.get('image').setValue( e.target.result);
        console.log( e.target.result);
        // const fileContent = e.target.result.replace('data:' + file.type + ';base64,', '');
      };
    event.files = [];
    console.log(event);
  }

  uploadErr(event) {
    console.log(event);
  }


}

