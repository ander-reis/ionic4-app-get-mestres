import {BaseController} from "./BaseController";
import {Request} from 'express';
import {RequestAnswers} from "../entity/RequestAnswers";

export class RequestAnswersController extends BaseController<RequestAnswers> {

    constructor() {
        super(RequestAnswers, false);
    }

    async all(request: Request) {
        let {orderUid} = request.params;

        if (!orderUid) {
            return {status: 400, message: "Informe o código da requisição"}
        }

        return this.repository.find({
            requestOrder: orderUid
        });
    }

    async save(request: Request) {
        let _requestAnswers = <RequestAnswers>request.body;

        super.isRequired(_requestAnswers.answer, 'Resposta é obrigatório');
        super.isRequired(_requestAnswers.requestOrder, 'RequestOrder é obrigatório');
        super.isRequired(_requestAnswers.question, 'Question é obrigatório');

        return super.save(_requestAnswers, request);
    }
}
