import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ClientModel} from './clients.model';
import {ClientsService} from './clients.service';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  providers: [ClientsService]
})
export class ClientsComponent implements OnInit {
  productDialog: boolean;

  clients: ClientModel[];

  // product: Product;

  // selectedProducts: Product[];

  submitted: boolean;

  statuses: any[];

  constructor(
    private router: Router,
    public clientService: ClientsService,
    private confirmationService: ConfirmationService ) { }

  ngOnInit(): void {
    this.clients = [];
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      console.log(this.clients, 'clinetsjd');
    });
    this.statuses = [
      {label: 'INSTOCK', value: 'instock'},
      {label: 'LOWSTOCK', value: 'lowstock'},
      {label: 'OUTOFSTOCK', value: 'outofstock'}
    ];
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
  openNew() {

    this.router.navigate(['/clients']).then();
    this.productDialog = true;
    // this.product = {};
    // this.submitted = false;
  }



  editProduct(client: ClientModel) {
    // this.product = {...product};
    // this.productDialog = true;
  }

  deleteClient(client: ClientModel) {
    this.confirmationService.confirm({
      message: 'ნამდვილად გსურთ მომხმარებლის წაშლა?',
      header: 'მომხმარებლის წაშლა',
      acceptLabel: 'კი',
      rejectLabel: 'არა',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clientService.deleteClient(client.id).subscribe(res => {
          console.log(res);
          this.clients = this.clients.filter(val => val.id !== client.id);
        });
        // this.product = {};
        // this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    // if (this.product.name.trim()) {
    //   if (this.product.id) {
    //     this.products[this.findIndexById(this.product.id)] = this.product;
    //     this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
    //   }
    //   else {
    //     this.product.id = this.createId();
    //     this.product.image = 'product-placeholder.svg';
    //     this.products.push(this.product);
    //     this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
    //   }
    //
    //   this.products = [...this.products];
    //   this.productDialog = false;
    //   this.product = {};
    // }
  }

  // findIndexById(id: string): number {
  //   let index = -1;
  //   for (let i = 0; i < this.products.length; i++) {
  //     if (this.products[i].id === id) {
  //       index = i;
  //       break;
  //     }
  //   }
  //
  //   return index;
  // }

  // createId(): string {
  //   let id = '';
  //   var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   for ( var i = 0; i < 5; i++ ) {
  //     id += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }
  //   return id;
  // }



// constructor( private dataService: DataService) { }
  //
  // ngOnInit(): void {
  //   this.dataService.sendGetRequest().subscribe(res => {
  //     console.log(res);
  //   });
  // }
  saveClient() {
    this.router.navigate(['/home']).then();
  }
}
