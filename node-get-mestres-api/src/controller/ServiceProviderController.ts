import {BaseController} from "./BaseController";
import {Request} from 'express';
import {ServiceProvider} from "../entity/ServiceProvider";
import * as md5 from 'md5';
import {FileHelper} from "../helpers/fileHelper";

export class ServiceProviderController extends BaseController<ServiceProvider> {

    constructor() {
        super(ServiceProvider, true);
    }

    private validationDefault(_serviceProvider: ServiceProvider): void {
        super.isRequired(_serviceProvider.name, 'O nome é obrigatório');
        super.isRequired(_serviceProvider.photo, 'A foto é obrigatório');
        super.isRequired(_serviceProvider.email, 'O email é obrigatório');
        super.isRequired(_serviceProvider.phone, 'A foto é obrigatório');
        super.isRequired(_serviceProvider.categoriesCare, 'Informe as categorias atendidas');
        super.isRequired(_serviceProvider.citiesCare, 'Informe as cidades atendidas');
        super.isRequired(_serviceProvider.zipCode, 'Informe seu cep');
        super.isRequired(_serviceProvider.state, 'Informe seu estado');
    }

    async save(request: Request) {
        let _serviceProvider = <ServiceProvider>request.body;

        this.validationDefault(_serviceProvider);

        if (_serviceProvider.photo) {
            let pictureCreateResult = await FileHelper.writePicture(_serviceProvider.photo);
            if (pictureCreateResult) {
                _serviceProvider.photo = pictureCreateResult;
            }
        }

        delete _serviceProvider.password;

        return super.save(_serviceProvider, request);
    }

    async createServiceProvider(request: Request) {
        let _serviceProvider = <ServiceProvider>request.body;
        let {confirmPassword} = request.body;

        this.validationDefault(_serviceProvider);

        super.isRequired(request.body.confirmPassword, 'A confirmação da senha é obrigatório');
        super.isTrue((_serviceProvider.password !== confirmPassword), 'Senhas diferentes');

        if (_serviceProvider.photo) {
            let pictureCreateResult = await FileHelper.writePicture(_serviceProvider.photo);
            if (pictureCreateResult) {
                _serviceProvider.photo = pictureCreateResult;
            }
        }

        if (_serviceProvider.password) {
            _serviceProvider.password = md5(_serviceProvider.password);
        }

        return super.save(_serviceProvider, request, true);
    }
}
