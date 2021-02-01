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
  clientImg: string;

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
    this.initForm();
     // this.clientForm.disable({onlySelf: true, emitEvent: true});


  }

  initForm() {
    this.clientForm = this.formBuilder.group({
      id: new FormControl(''),
      pin: new FormControl('', [Validators.required, this.numberExactLengthValidator.validate(11)]),
      firstName: new FormControl('',
          [Validators.required,
                       this.geoEnRegexValidator.validate(),
                       Validators.maxLength(50),
                       Validators.minLength(2)]),
      lastName: new FormControl('',
         [Validators.required,
                      this.geoEnRegexValidator.validate(),
                      Validators.maxLength(50),
                      Validators.minLength(2)]),
      phoneNumber:  new FormControl('', [Validators.required, this.phoneNumberValidator.validate()]),
      gender: new FormControl('')
    });
    this.legalAddress = this.initAddressForm();
    this.actualAddress = this.initAddressForm();
  }

  fillForm(client: ClientModel) {
    this.submitted = false;
    this.client = {...client};
    console.log(this.client, client, 'client');
    this.clientImg = this.client.image;
    this.fillFormControls(this.client, this.clientForm);
    // if (this.clientForm && this.clientForm.controls) {
    //       Object.keys(this.clientForm.controls).forEach(key => {
    //         this.clientForm.get(key).setValue(this.client[key]);
    //       });
    // }
    this.fillFormControls(this.client.legalAddress, this.legalAddress);
    this.fillFormControls(this.client.actualAddress, this.actualAddress);
    // this.legalAddress.setValue(this.client.legalAddress);
    // this.actualAddress.setValue(this.client.actualAddress);
    //this.clientForm.setValue( this.client);
  }

  initAddressForm(): FormGroup {
    return this.formBuilder.group({
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }

  fillFormControls(data: any, form: FormGroup) {
    if (form && form.controls) {
      Object.keys(form.controls).forEach(key => {
        form.get(key).setValue(data[key]);
      });
    }
  }

  onSave() {
    this.submitted = true;
    console.log(this.clientForm.get('firstName').errors , 'firstName');
    console.log(this.clientForm.get('lastName').errors , 'lastName');
    this.client = this.clientForm.value;
    this.client.image = this.clientImg;
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

  // openFile(){
  //   console.log( document.querySelector('input').click();)
  //   document.querySelector('input').click();
  // }
  onUpload(event) {
    console.log(event);
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e: any) => {
        this.clientImg = e.target.result;
        console.log(this.clientImg);
      };
      //this.clientForm.get('image').setValue(this.clientImg);
    }
    //console.log(event);
  }

  uploadErr(event) {
    console.log(event);
  }


}

