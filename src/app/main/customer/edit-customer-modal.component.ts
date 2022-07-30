import { Component, ViewChild, Injector, ElementRef, Output, EventEmitter } from '@angular/core';
import { CustomerServiceProxy, EditCustomerInput, User } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';

@Component({
  selector: 'editCustomerModal',
  templateUrl: './edit-customer-modal.component.html'
})
export class EditCustomerModalComponent extends AppComponentBase {

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('nameInput') nameInput: ElementRef;
  
  customer: EditCustomerInput = new EditCustomerInput();

  active: boolean = false;
  saving: boolean = false;

  constructor(
    injector: Injector,
    private _customerService: CustomerServiceProxy
  ) {
    super(injector);
  }

  show(customerId): void {
    this.active = true;
    this._customerService.getCustomerForEdit(customerId).subscribe((result)=> {
      this.customer = result;
      this.modal.show();
    });

  }

  onShown(): void {

  }

  save(): void {
    this.saving = true;
    this._customerService.editCustomer(this.customer)
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close();
        this.modalSave.emit(this.customer);
      });
    this.saving = false;
  }

  close(): void {
    this.modal.hide();
    this.active = false;
  }
}
