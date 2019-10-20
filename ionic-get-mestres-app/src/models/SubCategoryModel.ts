import {BaseModel} from "./BaseModel";
import {CategoryModel} from "./CategoryModel";

export class SubCategoryModel extends BaseModel {
    name: string;
    cost: number;
    description: string;
    category: CategoryModel;

    constructor() {
        super();
        this.category = new CategoryModel();
    }
}
