import {BaseController} from "./BaseController";
import {Request} from 'express';
import {RequestOrder} from '../entity/RequestOrder';
import {RequestStatus} from "../entity/enum/RequestStatus";

export class RequestOrderController extends BaseController<RequestOrder> {

    constructor() {
        super(RequestOrder, false);
    }

    async save(request: Request) {
        let _requestOrder = <RequestOrder>request.body;

        super.isRequired(_requestOrder.longlat, 'Latitude e longitude é obrigatório');
        super.isRequired(_requestOrder.title, 'Título obrigatório');
        super.isRequired(_requestOrder.description, 'Descrição é obrigatório');
        super.isRequired(_requestOrder.customer, 'Customer é obrigatório');

        if(!_requestOrder.uid){
            _requestOrder.statusOrder = RequestStatus.pending;
        }

        return super.save(_requestOrder, request);
    }
}
