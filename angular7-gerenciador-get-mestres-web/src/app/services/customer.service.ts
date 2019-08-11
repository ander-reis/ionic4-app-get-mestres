import {Injectable} from '@angular/core';
import {BaseService} from "../base/base.service";
import {HttpService} from "./http.service";
import {CustomerModel} from "../model/CustomerModel";

@Injectable({
    providedIn: 'root'
})
export class CustomerService extends BaseService<CustomerModel> {

    constructor(public http: HttpService) {
        super('customer', http);
    }
}
