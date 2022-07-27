import { Component, ViewChild, Injector, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
//import { ModalDirective } from 'ngx-bootstrap';
import { PersonServiceProxy, CreatePersonInput, CreateCustomerInput, CustomerServiceProxy, UserListDto, UserServiceProxy, User } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { finalize } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';

@Component({
    selector: 'createCustomerModal',
    templateUrl: './create-customer-modal.component.html'
})
export class CreateCustomerModalComponent extends AppComponentBase  implements OnInit {
    // user: UserListDto[] = [];
    filter: string = '';
    user:User[]=[];
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('modal' , { static: false }) modal: ModalDirective;
    @ViewChild('nameInput' , { static: false }) nameInput: ElementRef;

    customer: CreateCustomerInput = new CreateCustomerInput();

    active: boolean = false;
    saving: boolean = false;

    constructor(
        injector: Injector,
        private _customerService: CustomerServiceProxy,
        private _userService:UserServiceProxy
    ) {
        super(injector);
    }
    ngOnInit(): void {
      
        this.getUser();
    }

    getUser(){
        this._customerService.getUser(this.filter).subscribe((result) => {
            this.user = result.items;
            console.log("user=",this.user);
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

    close(): void {
        this.modal.hide();
        this.active = false;
    }
    // getUser(): void {
    //     this._userService.getUsers(this.filter).subscribe((result) => {
    //         this.user = result.items;
    //     });
    // }
    
}
