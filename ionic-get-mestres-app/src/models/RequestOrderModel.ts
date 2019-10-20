import {UserModel} from "./UserModel";
import {SubCategoryModel} from "./SubCategoryModel";
import {ServiceProviderModel} from "./ServiceProviderModel";
import {RequestStatusModel} from "./RequestStatusModel";


export class RequestOrderModel {
    longlat: string;
    title: string;
    description: string;
    statusOrder: RequestStatusModel;
    customer: UserModel;
    subCategory: SubCategoryModel;
    serviceProvider: ServiceProviderModel;
}
