import {BaseController} from "./BaseController";
import {Request} from 'express';
import {RequestOrder} from '../entity/RequestOrder';
import {RequestStatus} from "../entity/enum/RequestStatus";

export class RequestOrderController extends BaseController<RequestOrder> {

    constructor() {
        super(RequestOrder, false);
    }

    async save(request: Request) {
        let _request = <RequestOrder>request.body;
        _request.customer.uid = request.userAuth.uid;

        super.isRequired(_request.title, 'Título obrigatório');
        super.isRequired(_request.description, 'Descrição é obrigatório');
        // super.isRequired(_request.customer, 'Customer é obrigatório');
        super.isRequired(_request.longlat, 'Latitude e longitude é obrigatório');
        super.isRequired(_request.subCategory, 'Informe a subCategoria do pedido');

        if (!_request.uid) {
            _request.statusOrder = RequestStatus.pending;
        }

        return super.save(_request, request);
    }
}
