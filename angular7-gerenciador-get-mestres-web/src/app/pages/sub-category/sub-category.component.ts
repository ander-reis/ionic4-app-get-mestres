import {Component, OnInit} from '@angular/core';
import {SubCategoryModel} from "../../model/SubCategoryModel";
import {CategoryModel} from "../../model/CategoryModel";
import {SubCategoryService} from "../../services/sub-category.service";
import {CategoryService} from "../../services/category.service";
import {MatSnackBar} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-sub-category',
    templateUrl: './sub-category.component.html',
    styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

    model: SubCategoryModel = new SubCategoryModel();
    categories: Array<CategoryModel>;

    constructor(
        private subCategorySrv: SubCategoryService,
        private categorySrv: CategoryService,
        private matSnack: MatSnackBar,
        private router: Router,
        private active: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.active.params.subscribe(p => this.getId(p.id));
        this.bindCategories();
    }

    async bindCategories(): Promise<void> {
        const result = await this.categorySrv.getAll();
        if (result.success) {
            this.categories = result.data as Array<CategoryModel>;
        }
    }

    async save(): Promise<void> {
        const result = await this.subCategorySrv.post(this.model);
        if(result.success){
            this.matSnack.open('SubCategoria criado com sucesso', undefined, {duration: 3000});
            this.router.navigateByUrl('/sub-categories');
        }
    }

    async getId(uid: string): Promise<void> {
        if (uid === 'new') {
            return;
        }
        const result = await this.subCategorySrv.getById(uid);
        this.model = result.data as SubCategoryModel;
    }
}
