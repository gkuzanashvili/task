import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../account.service';
import {AccountModel} from '../account.model';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.css']
})
export class AccountViewComponent implements OnInit {

  accountForm: FormGroup;

  account = new AccountModel();

  submitted = false;

  @Output() newAccount = new EventEmitter<AccountModel>();

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.initForm();

  }

  initForm(account?) {
    if (account) { this.account = account; }
    this.submitted = false;
    this.accountForm = new FormGroup({
      accountNumber: new FormControl(this.account.accountNumber, Validators.required),
      clientNumber: new FormControl(this.account.clientNumber, Validators.required),
      currency: new FormControl(this.account.currency, Validators.required),
      accountStatus: new FormControl(this.account.accountStatus, Validators.required),
      accountType: new FormControl(this.account.accountType, Validators.required),
    });
  }

  onSave() {
    this.submitted = true;
    this.account = this.accountForm.value;
    console.log(this.accountForm, this.accountForm.valid);
    if (this.accountForm.valid) {
      this.newAccount.emit(this.account);
    }
  }
  // clare() {
  //   if (this.accountForm && this.accountForm.controls) {
  //     Object.keys(this.accountForm.controls).forEach(key => {
  //       this.accountForm.get(key).setValue('');
  //     });
  //   }
  // }
}
