import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {SubCategoryModel} from "../models/SubCategoryModel";
import {HttpService} from "./http.service";
import {environment} from "../environments/environment";
import {QuestionModel} from "../models/QuestionModel";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService extends BaseService<QuestionModel> {

  constructor(public http: HttpService) {
    super('question', http);
  }

  getAllQuestions(subCategoryUid: string) {
    return this.http.get(`${environment.url_api}/subcategory/${subCategoryUid}/questions`);
  }
}
