import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ClientModel} from './clients.model';
import {ClientsService} from './clients.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ClientModalComponent} from './client-modal/client-modal.component';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

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

  filteredClients: ClientModel[];

  client = new ClientModel();

  showSearchPanel = false;

  clientSearchForm: FormGroup;

  @ViewChild(ClientModalComponent) clientModalComponent: ClientModalComponent;


  constructor(
    private router: Router,
    public clientService: ClientsService,
    public formBuilder: FormBuilder,
    public messageService: MessageService,
    private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.clients = [];
    this.getClients();
  }

  getClients() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      console.log(this.clients, 'clinetsjd');
    });
  }

  openNew() {
    this.clientModal = true;
    this.client = new ClientModel();
    this.clientModalComponent.fillForm(this.client);
  }

  onSearch() {
    this.showSearchPanel = !this.showSearchPanel;
    if (!this.showSearchPanel) {
      this.getClients();
    } else {
      this.clientSearchForm = this.formBuilder.group({
        pin: new FormControl(''),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        phoneNumber: new FormControl('')
      });
    }
  }

  searchResult() {
    if (this.clientSearchForm.value) {
      this.filteredClients = [...this.clients];
      const firstName = this.clientSearchForm.get('firstName').value;
      const lastName = this.clientSearchForm.get('lastName').value;
      const pin = this.clientSearchForm.get('pin').value;
      const phone = this.clientSearchForm.get('phoneNumber').value;
      if (firstName || lastName || pin || phone) {
        if (firstName) {
          this.filteredClients = this.filteredClients.filter(item => {
            return item.firstName === firstName;
          });
        }
        if (lastName) {
          this.filteredClients = this.filteredClients.filter(item => {
            return item.lastName === lastName;
          });
        }
        if (pin) {
          this.filteredClients = this.filteredClients.filter(item => {
            return item.pin === pin;
          });
        }
        if (phone) {
          this.filteredClients = this.filteredClients.filter(item => {
            return item.phoneNumber === phone;
          });
        }
        this.clients = [...this.filteredClients];
      } else {
        this.getClients();
      }
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
    this.clientModalComponent.fillForm(this.client);
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
    this.client = new ClientModel();
  }

  createId(): number {
    const ids = this.clients.map((item) => item.id);
    return Math.max(...ids) + 1;
  }
}
