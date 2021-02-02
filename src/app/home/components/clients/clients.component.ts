import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
export class ClientsComponent implements OnInit{
  clientModal: boolean;

  showAccountsTable: boolean;

  clients: ClientModel[];

  filteredClients: ClientModel[];

  client = new ClientModel();

  showSearchPanel = false;

  clientSearchForm: FormGroup;

  startRow = 0;

  page = 1;

  sortField = '';

  sortOrder = 0;

  @ViewChild(ClientModalComponent) clientModalComponent: ClientModalComponent;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public clientService: ClientsService,
    public formBuilder: FormBuilder,
    public messageService: MessageService,
    private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.clients = [];
    this.activatedRoute.queryParams.subscribe(params => {
      this.page = params.page ? params.page : 1;
      this.startRow = (this.page - 1) * 5;
      this.sortOrder = params.sortOrder;
      this.sortField = params.sortField;
    });
    this.activatedRoute.data.subscribe(data => {
      this.clients = data.clients;
    });
  }

  setPage(event) {
    this.page = event.first / event.rows + 1;
    this.setRoutParam();
  }

  setRoutParam() {
    const params = this.sortField ? {page: this.page, sortField: this.sortField, sortOrder: this.sortOrder} : {page: this.page};
    this.router.navigate([], {queryParams: params}).then();
  }

  getClients() {
    this.clientService.getClients().then(clients => {
      this.clients = clients;
    }).catch(err => {
      this.messageService.add({severity: 'error', summary: 'შეცდომა', detail: err, life: 3000});
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

  onSort(event) {
    if (event.data.length) {
      this.page = 1;
      this.sortField = event.field;
      this.sortOrder = event.order;
      this.setRoutParam();
      event.data = this.sort(event.data, event.field, event.order);
    }
  }

  getSortIcon(sortField) {
    if (this.sortField === sortField) {
      return this.sortOrder > 0 ? 'pi pi-sort-amount-up' : 'pi pi-sort-amount-down';
    } else {
      return 'pi pi-sort-alt';
    }
  }

  showAccounts(client: ClientModel) {
    this.client = {...client};
    this.showAccountsTable = !this.showAccountsTable;
    this.getClients();
  }

  editClient(client: ClientModel, isViewMode?) {
    this.client = {...client};
    this.clientModalComponent.fillForm(this.client, isViewMode);
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
        }).catch(err => {
          this.messageService.add({severity: 'error', summary: 'შეცდომა', detail: err, life: 3000});
        });
      }
    });
  }

  saveClient(client: ClientModel) {
    this.client = client;
    if (this.client.id) {
      this.clientService.updateClient(this.client).then((res) => {
        this.getClients();
        this.messageService.add({severity: 'success', summary: 'წარმატებული', detail: 'მონაცემები განახლდა', life: 3000});
      }).catch(err => {
        this.messageService.add({severity: 'error', summary: 'შეცდომა', detail: err, life: 3000});
      });

    } else {
      this.client.id = this.createId();
      this.clientService.saveClient(this.client).then(() => {
        this.getClients();
        this.messageService.add({severity: 'success', summary: 'წარმატებული', detail: 'მომხმარებელი დაემატა', life: 3000});
      }).catch(err => {
        this.messageService.add({severity: 'error', summary: 'შეცდომა', detail: err, life: 3000});
      });
    }
    this.clientModal = false;
    this.client = new ClientModel();
  }

  private createId(): number {
    const ids = this.clients.map((item) => item.id);
    return Math.max(...ids) + 1;
  }

  private sort(data, field, order) {
    return  data.sort((data1, data2) => {
      const value1 = data1[field];
      const value2 = data2[field];
      let result = null;
      if (value1 == null && value2 != null) {
        result = -1;
      } else if (value1 != null && value2 == null) {
        result = 1;
      } else if (value1 == null && value2 == null) {
        result = 0;
      } else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else {
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      }
      return (order * result);
    });
  }

}
