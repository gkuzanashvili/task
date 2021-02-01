import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AccountModel } from './account.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ClientModel} from '../clients.model';
import {AccountService} from './account.service';
import {AccountViewComponent} from './account-view/account-view.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [AccountService],
})
export class AccountComponent implements OnInit{

  @Input() client = new ClientModel();
  @ViewChild(AccountViewComponent) accountComponent: AccountViewComponent;

  accounts = new Array<AccountModel>();
  newAccountsModal: boolean;

  constructor( private messageService: MessageService,
               public accountService: AccountService,
               public confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.initData(this.client);
    this.initConstants();
  }
  initData(client?: ClientModel) {
    this.client = {...client};
    if (client.accounts) {
      this.accounts = client.accounts;
    }
  }

  initConstants() {
    this.accountService.getConstants().then(res => {
      this.accountService.statuses = res.statuses;
      this.accountService.types = res.types;
      this.accountService.currencies = res.currencies;
    });
  }
  openNewAccount() {
      this.newAccountsModal = true;
      const account = new AccountModel();
      account.clientNumber = this.client.pin;
      this.accountComponent.initForm(account);
  }
  onEdit(account: AccountModel) {
    this.accountComponent.initForm(account);
    this.newAccountsModal = true;
  }
  onSave(account: AccountModel) {
    console.log(account, '    this.newAccount.emit(this.account);\n');
    const changedIndex = this.accounts && this.accounts.length ?
      this.accounts.findIndex(a =>  a.accountNumber === account.accountNumber) : -1;
    if (changedIndex >= 0) {
      this.client.accounts[changedIndex] = {...account};
      this.accountService.updateAccount(this.client).then((res) => {
        this.messageService.add({severity: 'success', summary: 'წარმატებული', detail: 'მონაცემები განახლდა', life: 3000});
      }).catch(err => {
        this.messageService.add({severity: 'error', summary: 'შეცდომა', detail: err, life: 3000});
      });
    } else {
      this.accounts.push({...account});
      this.client.accounts = this.accounts;
      this.accountService.saveAccount(this.client).then((res) => {
        this.messageService.add({severity: 'success', summary: 'წარმატებული', detail: 'ანგარიში დამატებულია', life: 3000});
      }).catch(err => {
        this.messageService.add({severity: 'error', summary: 'შეცდომა', detail: err, life: 3000});
      });
    }
    this.newAccountsModal = false;
  }

  deleteAccount(account: AccountModel) {
    this.confirmationService.confirm({
      message: 'ნამდვილად გსურთ ანგარიშის წაშლა?',
      header: 'ანგარიშის წაშლა',
      acceptLabel: 'კი',
      rejectLabel: 'არა',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accounts = this.accounts.filter(val => val.accountNumber !== account.accountNumber);
        this.client.accounts = [...this.accounts];
        this.accountService.deleteAccount(this.client).then(() => {
          this.initData(this.client);
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'ანგარიში წაიშალა', life: 3000});
        }).catch(err => {
          this.messageService.add({severity: 'error', summary: 'შეცდომა', detail: err, life: 3000});
        });
      }
    });
  }
  getTypeLabel(typeValue) {
    return this.accountService.types.find(i => i.value === typeValue).label;
  }
  getStatusLabel(statusValue) {
    return this.accountService.statuses.find(i => i.value === statusValue).label;
  }
}
