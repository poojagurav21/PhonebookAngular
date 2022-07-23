import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CustomerListDto, CustomerServiceProxy } from '@shared/service-proxies/service-proxies';
import * as _ from 'lodash-es';
@Component({
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.less'],
    animations: [appModuleAnimation()]
})

export class CustomerComponent extends AppComponentBase implements OnInit {
    customer: CustomerListDto[] = [];
    filter: string = '';

    constructor(
        injector: Injector,
        private _customerService: CustomerServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getCustomer();
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
    
}
