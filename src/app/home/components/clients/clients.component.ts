import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ClientModel} from './clients.model';
import {ClientsService} from './clients.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ClientModalComponent} from './client-modal/client-modal.component';
import {AccountComponent} from './account-modal/account.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  providers: [ClientsService]
})
export class ClientsComponent implements OnInit {
  clientModal: boolean;

  showAccountsTable: boolean;

  clients: ClientModel[];

  client = new ClientModel();

  showSearchPanel = false;

  // selectedProducts: Product[];

  submitted: boolean;

  clientSearchForm: FormGroup;

  // statuses: any[];

  @ViewChild(ClientModalComponent) clientModalComponent: ClientModalComponent;
 // @ViewChild(AccountComponent) accountComponent: AccountComponent;


  constructor(
    private router: Router,
    public clientService: ClientsService,
    public formBuilder: FormBuilder,
    public messageService: MessageService,
    private confirmationService: ConfirmationService ) { }

  ngOnInit(): void {
    this.clients = [];
    this.getClients();
    // this.statuses = [
    //   {label: 'INSTOCK', value: 'instock'},
    //   {label: 'LOWSTOCK', value: 'lowstock'},
    //   {label: 'OUTOFSTOCK', value: 'outofstock'}
    // ];
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  getClients() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      console.log(this.clients, 'clinetsjd');
    });
  }

  openNew() {
    this.clientModal = true;
    this.client = new ClientModel();
    this.clientModalComponent.initForm(this.client);
    // this.submitted = false;
  }

  onSearch() {
    this.showSearchPanel = !this.showSearchPanel;
    if ( !this.showSearchPanel) {this.getClients(); }
    this.clientSearchForm = this.formBuilder.group({
        pin: new FormControl(''),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        phoneNumber:  new FormControl('')
      });

  }
  searchResult() {
    if (this.clientSearchForm.value) {
      this.clients = this.clients.filter(c =>
        c.pin === this.clientSearchForm.get('pin').value &&
        c.firstName === this.clientSearchForm.get('firstName').value &&
        c.lastName === this.clientSearchForm.get('lastName').value &&
        c.phoneNumber === this.clientSearchForm.get('phoneNumber').value
      );
    }
  }
  showAccounts(client: ClientModel) {
    console.log(client.accounts, 'acct');
    this.client = {...client};
    this.showAccountsTable = !this.showAccountsTable;
    this.getClients();
  }

  editClient(client: ClientModel) {
     this.client = {...client};
     this.clientModalComponent.initForm(this.client);
     this.clientModal = true;
  }

  deleteClient(client: ClientModel) {
    this.confirmationService.confirm({
      message: 'ნამდვილად გსურთ მომხმარებლის წაშლა?',
      header: 'მომხმარებლის წაშლა',
      acceptLabel: 'კი',
      rejectLabel: 'არა',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clientService.deleteClient(client.id).then(() => {
          this.clients = this.clients.filter(val => val.id !== client.id);
          this.client = new ClientModel();
          this.showAccountsTable = false;
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'მომხმარებელი წაიშალა', life: 3000});
        });
      }
    });
  }

  saveClient(client: ClientModel) {
    this.client = client;
    if (this.client.id) {
      this.clientService.updateClient(this.client).then((res) => {
        console.log(res, 'update');
        this.getClients();
        this.messageService.add({severity: 'success', summary: 'წარმატებული', detail: 'მონაცემები განახლდა', life: 3000});
      });

    } else {
      console.log('save', this.client);
      this.client.id = this.createId();
      this.clientService.saveClient(this.client).then(() => {
        this.getClients();
        this.messageService.add({severity: 'success', summary: 'წარმატებული', detail: 'მომხმარებელი დაემატა', life: 3000});
      });
    }
    this.clientModal = false;
    // this.getClients();
    this.client = new ClientModel();
  }

  // private findIndexById(id: number): number {
  //    let index = -1;
  //    for (let i = 0; i < this.clients.length; i++) {
  //      if ( this.clients[i].id === id ) {
  //        index = i;
  //        break;
  //      }
  //    }
  //
  //    return index;
  //  }


  createId(): number {
    const ids = this.clients.map((item) => item.id);
    return Math.max(...ids) + 1;
  }
}
