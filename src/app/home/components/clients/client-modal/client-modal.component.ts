import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ClientModel} from '../clients.model';
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
  isDisabled = false;
  constructor(
    private formBuilder: FormBuilder,
    public phoneNumberValidator: PhoneNumberValidator,
    public numberExactLengthValidator: ExactLengthValidator,
    public geoEnRegexValidator: GeoEnRegexValidator
  ) { }

  ngOnInit(): void {
    this.initForm();
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
  initAddressForm(): FormGroup {
    return this.formBuilder.group({
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }
  fillForm(client: ClientModel, isViewMode?: false) {
    this.submitted = false;
    this.client = null;
    this.client = {...client};
    this.clientImg = this.client.image;
    this.fillFormControls(this.client, this.clientForm);
    this.fillFormControls(this.client.legalAddress, this.legalAddress);
    this.fillFormControls(this.client.actualAddress, this.actualAddress);
    this.disableForm();
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

  isValid() {
    return this.clientForm.valid && this.legalAddress.valid && this.actualAddress.valid;
  }

  onUpload(event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e: any) => {
        this.clientImg = e.target.result;
        console.log(this.clientImg);
      };
    }
  }

  private fillFormControls(data: any, form: FormGroup) {
    if (form && form.controls) {
      Object.keys(form.controls).forEach(key => {
        form.get(key).setValue(data[key]);
      });
    }
  }
  private disableForm() {
    this.clientForm.disable({onlySelf: true, emitEvent: true});
    this.legalAddress.disable({onlySelf: true, emitEvent: true});
    this.actualAddress.disable({onlySelf: true, emitEvent: true});
    this.isDisabled = true;
  }

}

