import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {SubCategoryModel} from "../../model/SubCategoryModel";
import {SubCategoryService} from "../../services/sub-category.service";
import {Constants} from "../../shared/constants";
import Swal from "sweetalert2";

@Component({
    selector: 'app-sub-categories',
    templateUrl: './sub-categories.component.html',
    styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {

    columns: string[] = ['Nome', 'Descrição', 'Categoria', 'uid'];
    dataSource: MatTableDataSource<SubCategoryModel>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private subCategorySrv: SubCategoryService
    ) {
    }

    ngOnInit() {
        this.bind();
    }

    async bind(): Promise<void> {
        const subCategories = await this.subCategorySrv.getAll();
        this.dataSource = new MatTableDataSource(subCategories.data);
        this.dataSource.paginator = this.paginator;
    }

    filter(value: string) {
        this.dataSource.filter = value.trim().toLowerCase();
    }

    async delete(model: SubCategoryModel) {
        const options: any = {
            ...Constants.confirm_swal_options, text: `Deseja excluir a sub-categoria ${model.name}?`
        };
        const {value} = await Swal.fire(options);
        if (value) {
            const result = await this.subCategorySrv.delete(model.uid);
            if (result.success) {
                this.bind();
            }
        }
    }
}
