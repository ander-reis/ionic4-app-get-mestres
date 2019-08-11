import {BaseController} from "./BaseController";
import {Request} from 'express';
import {SubCategory} from "../entity/SubCategory";


export class SubCategoryController extends BaseController<SubCategory> {

    constructor() {
        super(SubCategory, true);
    }

    save(request: Request) {
        let _subCategory = <SubCategory>request.body;
        super.isRequired(_subCategory.name, 'O nome da SubCategoria é obrigatório');
        super.isRequired(_subCategory.category, 'A Categoria é obrigatória');
        super.isRequired(_subCategory.cost, 'O custo é obrigatório');
        super.isTrue(isNaN(_subCategory.cost), 'O custo deve ser número');
        super.isTrue(_subCategory.cost <= 0, 'O custo deve ser maior que 0');
        return super.save(_subCategory, request);
    }
}
