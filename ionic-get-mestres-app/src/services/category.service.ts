import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {BaseService} from "./base.service";
import {CategoryModel} from "../models/CategoryModel";

@Injectable({
    providedIn: 'root'
})
export class CategoryService extends BaseService<CategoryModel> {

    constructor(public http: HttpService) {
        super('category', http);
    }
}
