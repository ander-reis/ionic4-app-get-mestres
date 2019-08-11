import {BaseModel} from "./BaseModel";

export class CustomerModel extends BaseModel {
    name: string;
    email: string;
    photo: string;
    password: string;
    confirmPassword: string;
    phone: string;
}
