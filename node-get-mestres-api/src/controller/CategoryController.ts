import {Category} from "../entity/Category";
import {BaseController} from "./BaseController";
import {Request} from 'express';
import {getRepository} from "typeorm";
import {SubCategory} from "../entity/SubCategory";


export class CategoryController extends BaseController<Category> {

    private _subCategoryRepository = getRepository(SubCategory);

    constructor() {
        super(Category, true);
    }

    save(request: Request) {
        let _category = <Category>request.body;
        super.isRequired(_category.name, 'O nome da categoria é obrigatório');
        return super.save(_category, request);
    }

    async all(request: Request) {
        return this.repository.find({
            where: {
                deleted: false
            }
        });
    }

    async getAllSubCategories(request: Request) {
        const {id: categoryId} = request.params;
        return this._subCategoryRepository.find({
            where: {
                category: categoryId,
                deleted: false,
                active: true
            }
        });
    }
}
