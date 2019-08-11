import {BaseController} from "./BaseController";
import {Request} from 'express';
import {Question} from "../entity/Question";
import {QuestionType} from "../entity/enum/QuestionType";


export class QuestionController extends BaseController<Question> {

    constructor() {
        super(Question);
    }

    save(request: Request) {
        let _question = <Question>request.body;

        super.isRequired(_question.question, 'A pergunta é obrigatória');
        super.isRequired(_question.type, 'O tipo da pergunta é obrigatório');
        super.isRequired(_question.subCategory, 'Informa a subcategoria da pergunta');

        let questionTypeInt:number = parseInt(_question.type.toString());

        if(_question.type && questionTypeInt === QuestionType.Select) {
            super.isRequired(_question.options, 'Para o tipo select você deve informar quais são as opções');
        }

        return super.save(_question, request);
    }
}
