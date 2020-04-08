import {BaseController} from "./BaseController";
import {Request} from 'express';
import {Customer} from "../entity/Customer";
import {FileHelper} from "../helpers/fileHelper";
import { sign } from 'jsonwebtoken';
import config from "../config/config";
import * as md5 from 'md5';

export class CustomerController extends BaseController<Customer> {

    constructor() {
        super(Customer, true);
    }

    async auth(request: Request) {

        let { email, password } = request.body;
        if (!email || !password)
            return { status: 400, message: 'Informe o email e a senha para efetuar o login' };

        let user = await this.repository.findOne({ email: email, password: md5(password) });
        if (user) {
            let _payload = {
                uid: user.uid,
                name: user.name,
                photo: user.photo,
                email: user.email
            }
            return {
                status: 200,
                message: {
                    user: _payload,
                    token: sign({
                        ..._payload,
                        tm: new Date().getTime()
                    }, config.secretKey)
                }
            }
        } else
            return { status: 404, message: 'E-mail ou senha inválidos' }
    }

    async one(request: Request){
        const customer = await super.one(request);
        delete customer['password'];
        return customer;
    }

    async save(request: Request) {
        let _customer = <Customer>request.body;
        let {confirmPassword} = request.body;

        super.isRequired(_customer.name, 'O nome é obrigatório');
        super.isRequired(_customer.email, 'O email é obrigatório');
        super.isRequired(_customer.photo, 'A foto é obrigatório');
        super.isRequired(_customer.phone, 'A foto é obrigatório');

        if (!_customer.uid) {
            super.isRequired(_customer.password, 'A senha é obrigatório');
            super.isRequired(confirmPassword, 'A confirmação da senha é obrigatório');
            super.isTrue((_customer.password != confirmPassword), 'A senha e a confirmação estão diferentes');
        } else {
            delete _customer.password;
        }

        if (_customer.photo) {
            let pictureCreateResult = await FileHelper.writePicture(_customer.photo);
            if (pictureCreateResult) {
                _customer.photo = pictureCreateResult;
            }
        }

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

        if (_customer.photo) {
            let pictureCreateResult = await FileHelper.writePicture(_customer.photo);
            if (pictureCreateResult) {
                _customer.photo = pictureCreateResult;
            }
        }

        if (_customer.password) {
            _customer.password = md5(_customer.password);
        }

        return super.save(_customer, request, true);
    }
}
