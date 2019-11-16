import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {CategoryModel} from "../../models/CategoryModel";

@Component({
    selector: 'app-nova-solicitacao',
    templateUrl: './nova-solicitacao.page.html',
    styleUrls: ['./nova-solicitacao.page.scss'],
})
export class NovaSolicitacaoPage implements OnInit {

    categories: Array<CategoryModel> = new Array<CategoryModel>();

    constructor(private categorySrv: CategoryService) {
    }

    ngOnInit() {
        this.loadData();
    }

    async loadData(): Promise<void> {
        const result = await this.categorySrv.getAll();
        if (result.success) {
            this.categories = result.data as Array<CategoryModel>;
        }
    }
}
