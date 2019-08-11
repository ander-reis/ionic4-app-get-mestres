import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {CategoryInterface} from "../../interfaces/CategoryInterface";
import {CategoryService} from "../../services/category.service";
import {Constants} from "../../shared/constants";
import Swal from "sweetalert2";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

    columns: string[] = ['Nome', 'Descrição', 'uid'];
    dataSource: MatTableDataSource<CategoryInterface>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private categorySrv: CategoryService) {
    }

    async ngOnInit() {
        this.bind();
    }

    async bind() {
        const categories = await this.categorySrv.getAll();
        // console.log(categories);
        this.dataSource = new MatTableDataSource(categories.data);
        this.dataSource.paginator = this.paginator;
    }

    filter(value: string) {
        this.dataSource.filter = value.trim().toLowerCase();
    }

    async delete(category: CategoryInterface): Promise<void> {
        const options: any = {
            ...Constants.confirm_swal_options, text: `Deseja excluir a categoria ${category.name}?`
        };
        const {value} = await Swal.fire(options);
        if (value) {
            const result = await this.categorySrv.delete(category.uid);
            if (result.success) {
                this.bind();
            }
        }
    }
}
