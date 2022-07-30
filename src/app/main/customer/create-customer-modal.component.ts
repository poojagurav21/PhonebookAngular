import { Component, ViewChild, Injector, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
import { PersonServiceProxy, CreatePersonInput, CreateCustomerInput, CustomerServiceProxy, UserListDto, UserServiceProxy, User } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { finalize } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
@Component({
    selector: 'createCustomerModal',
    templateUrl: './create-customer-modal.component.html'
})
export class CreateCustomerModalComponent extends AppComponentBase implements OnInit {

    filter: string = '';
    user: User[] = [];
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('modal', { static: false }) modal: ModalDirective;
    @ViewChild('nameInput', { static: false }) nameInput: ElementRef;
    userValues = [];
    customer: CreateCustomerInput = new CreateCustomerInput();

    active: boolean = false;
    saving: boolean = false;

    constructor(
        injector: Injector,
        private _customerService: CustomerServiceProxy,
        private _userService: UserServiceProxy
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.userValues = [];
        this.getUser();

    }

    getUser() {
        this._customerService.getUser(this.filter).subscribe((result) => {
            this.user = result.items;
            console.log("user=", this.user);
        });
    }
    show(): void {
        this.active = true;
        this.customer = new CreateCustomerInput();
        this.modal.show();
    }

    onShown(): void {
        this.nameInput.nativeElement.focus();
    }

    save(): void {
        this.saving = true;
        this._customerService.createCustomer(this.customer)
            .pipe(finalize(() => this.saving = false))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(this.customer);
            });

    }

    refresh(): void {
        window.location.reload();
    }

    onselect(value) {
        console.log("selected id=", value)
    }
    pushValue(value) {

        console.log("userIds=", value);

        this.userValues.push(value);
        console.log("UserValues=", this.userValues);
        this.customer.userRefId = this.userValues;
    }
    close(): void {
        this.modal.hide();
        this.active = false;
    }

}
