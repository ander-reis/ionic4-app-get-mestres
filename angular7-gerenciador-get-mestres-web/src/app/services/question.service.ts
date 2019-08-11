import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {BaseService} from "../base/base.service";
import {QuestionModel} from "../model/QuestionModel";
import {SelectInterface} from "../interfaces/SelectInterface";

@Injectable({
    providedIn: 'root'
})
export class QuestionService extends BaseService<QuestionModel> {

    constructor(public http: HttpService) {
        super('question', http);
    }

    static getQuestionsType(): Array<SelectInterface> {
        return [
            {value: 1, label: 'Text'},
            {value: 2, label: 'Date'},
            {value: 3, label: 'Select'},
            {value: 4, label: 'Memo'},
        ]
    }
}
