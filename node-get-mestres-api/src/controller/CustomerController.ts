import {BaseController} from "./BaseController";
import {Request} from 'express';
import {Customer} from "../entity/Customer";
import * as md5 from 'md5';
import {FileHelper} from "../helpers/fileHelper";

export class CustomerController extends BaseController<Customer> {

    constructor() {
        super(Customer, true);
    }

    async save(request: Request) {
        let _customer = <Customer>request.body;

        super.isRequired(_customer.name, 'O nome é obrigatório');
        super.isRequired(_customer.email, 'O email é obrigatório');
        super.isRequired(_customer.photo, 'A foto é obrigatório');
        super.isRequired(_customer.phone, 'A foto é obrigatório');

        if(_customer.photo){
            let pictureCreateResult = await FileHelper.writePicture(_customer.photo);
            if(pictureCreateResult){
                _customer.photo = pictureCreateResult;
            }
        }

        delete _customer.password;

        return super.save(_customer, request);
    }

    async createCustomer(request: Request) {
        let _customer = <Customer>request.body;
        let {confirmPassword} = request.body;

        super.isRequired(_customer.name, 'O nome é obrigatório');
        super.isRequired(_customer.email, 'O email é obrigatório');
        super.isRequired(_customer.photo, 'A foto é obrigatório');
        super.isRequired(_customer.phone, 'A foto é obrigatório');
        super.isRequired(_customer.password, 'A senha é obrigatório');
        super.isRequired(request.body.confirmPassword, 'A confirmação da senha é obrigatório');
        super.isTrue((_customer.password !== confirmPassword), 'Senhas diferentes');

        if(_customer.photo){
            let pictureCreateResult = await FileHelper.writePicture(_customer.photo);
            if(pictureCreateResult){
                _customer.photo = pictureCreateResult;
            }
        }

        if (_customer.password) {
            _customer.password = md5(_customer.password);
        }

        return super.save(_customer, request, true);
    }
}
