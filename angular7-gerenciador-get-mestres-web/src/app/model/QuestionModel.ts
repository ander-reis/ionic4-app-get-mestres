import {BaseModel} from "./BaseModel";
import {SubCategoryModel} from "./SubCategoryModel";
import {QuestionType} from "./enums/QuestionType";

export class QuestionModel extends BaseModel {
    question: string;
    type: number;
    options: QuestionType;
    subCategory: SubCategoryModel;

    constructor(){
        super();
        this.subCategory = new SubCategoryModel();
    }
}
