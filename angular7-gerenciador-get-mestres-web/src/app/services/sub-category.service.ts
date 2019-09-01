import {Injectable} from '@angular/core';
import {BaseService} from "../base/base.service";
import {SubCategoryModel} from "../model/SubCategoryModel";
import {HttpService} from "./http.service";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SubCategoryService extends BaseService<SubCategoryModel> {

    constructor(public http: HttpService) {
        super('subcategory', http);
    }

    getAllByCategory(categoryUid: string) {
        return this.http.get(`${environment.url_api}/category/${categoryUid}/sub-categories`);
    }
}
