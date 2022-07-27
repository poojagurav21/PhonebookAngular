import { Component, ViewChild, Injector, ElementRef, Output, EventEmitter } from '@angular/core';
//import { ModalDirective } from 'ngx-bootstrap';
import { CreateCustomerInput, CustomerServiceProxy, EditCustomerInput, User } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';

@Component({
  selector: 'viewCustomerUserModal',
  templateUrl: './view-customer-user-modal.component.html'
})
export class ViewCustomerUserModalComponent extends AppComponentBase {

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('nameInput') nameInput: ElementRef;
  

  customer: CreateCustomerInput = new CreateCustomerInput();

  active: boolean = false;
  saving: boolean = false;

  constructor(
    injector: Injector,
    private _customerService: CustomerServiceProxy
  ) {
    super(injector);
  }

//   show(customerId): void {
//     this.active = true;
//     this._customerService.createCustomer(customerId).subscribe((result)=> {
//       this.customer = result;
//       this.modal.show();
//     });

 //
  onShown(): void {
   // this.nameInput.nativeElement.focus();
  }

 
  close(): void {
    this.modal.hide();
    this.active = false;
  }
}
