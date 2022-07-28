import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AddUserInput, CustomerListDto, CustomerServiceProxy, User, UserViewDto } from '@shared/service-proxies/service-proxies';
import * as _ from 'lodash-es';
@Component({
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.less'],
    animations: [appModuleAnimation()]
})

export class CustomerComponent extends AppComponentBase implements OnInit {
    customer: CustomerListDto[] = [];
    filter: string = '';
    editingCustomer: CustomerListDto = null;
    newUser: AddUserInput = null;
    user: User[] = [];
    custUser:UserViewDto;
    //custUser:Customer[]=[];
    constructor(
        injector: Injector,
        private _customerService: CustomerServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getCustomer();
        this.getUser();
    }

    getCustomer(): void {
        this._customerService.getCustomer(this.filter).subscribe((result) => {
            this.customer = result.items;
        });
    }
    deleteCustomer(customer: CustomerListDto): void {
        this.message.confirm(
            this.l('If yes click Yes button', customer.customerName),
            this.l('Are You Sure To Delete The Person?'),
            isConfirmed => {
                if (isConfirmed) {
                    this._customerService.deleteCustomer(customer.id).subscribe(() => {
                        this.notify.info(this.l('SuccessfullyDeleted'));
                        _.remove(this.customer, customer);
                    });
                }
            }
        );
    }
    editCustomer(customer: CustomerListDto): void {
        if (customer === this.editingCustomer) {
            this.editingCustomer = null;
        } else {
            this.editingCustomer = new CustomerListDto();
            this.editingCustomer.custUsers = [];
            this.editingCustomer = customer;

            this.newUser = new AddUserInput();

            this.newUser.customerRefId = customer.id;
        }
    };

    deleteUser(user, customer): void {
        this._customerService.deleteUser(user.id).subscribe(() => {
            this.notify.success(this.l('SuccessfullyDeleted'));
            _.remove(customer.custUsers, user);
        });
    };

    saveUser(): void {
        if (!this.newUser.customerRefId && !this.newUser.userRefId) {
            this.message.warn('Please enter a number!');
            return;
        }

        this._customerService.addUser(this.newUser).subscribe((result) => {

            //  result.userId=10;
            this.editingCustomer.custUsers.push(result);
            console.log(result);
            // this.newUser.customerRefId
            // this.newUser.userRefId()
            // this.newUser.totalBillingAmount
            this.notify.success(this.l('SavedSuccessfully'));
        });
    };
    getUser() {
        this._customerService.getUser(this.filter).subscribe((result) => {
            this.user = result.items;
            console.log("user=", this.user);
        });
    }
    viewUser(customerId) {
        // if (customer === this.editingCustomer) {
        //     this.editingCustomer
        // }
        this._customerService.getUserView(this.customer.id).subscribe((result:any)=>{
            console.log(result);
            this.custUser=result;
        })
    }
}
//  editPerson(person: PersonListDto): void {
//         if (person === this.editingPerson) {
//             this.editingPerson = null;
//         } else {
//             this.editingPerson = person;

//             this.newPhone = new AddPhoneInput();
//             this.newPhone.type = PhoneType.Mobile;
//             this.newPhone.personId = person.id;
//         }
//     };
