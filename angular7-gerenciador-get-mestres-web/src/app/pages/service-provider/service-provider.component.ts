import {Component, OnInit} from '@angular/core';
import {ServiceProviderModel} from "../../model/ServiceProviderModel";
import {MatSnackBar} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {FileManager} from "../../components/input-file/input-file.component";
import {ServiceProviderService} from "../../services/service-provider.service";
import {SubCategoryModel} from "../../model/SubCategoryModel";
import {CategoryModel} from "../../model/CategoryModel";
import {CategoryService} from "../../services/category.service";
import {SubCategoryService} from "../../services/sub-category.service";
import {AddressService} from "../../services/address.service";
import {removeSummaryDuplicates} from "@angular/compiler";

@Component({
    selector: 'app-service-provider',
    templateUrl: './service-provider.component.html',
    styleUrls: ['./service-provider.component.scss']
})
export class ServiceProviderComponent implements OnInit {

    model: ServiceProviderModel = new ServiceProviderModel();
    subCategoriesSelect: Array<SubCategoryModel> = new Array<SubCategoryModel>();
    categories: Array<CategoryModel>;
    subCategories: Array<SubCategoryModel>;

    constructor(
        private serviceProviderSrv: ServiceProviderService,
        private categorySrv: CategoryService,
        private subCategorySrv: SubCategoryService,
        private addressSrv: AddressService,
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

    async bindSubCategories(categoryUid): Promise<void> {
        const result = await this.subCategorySrv.getAllByCategory(categoryUid);
        if (result.success) {
            this.subCategories = result.data as Array<SubCategoryModel>;
        }
    }

    async save(): Promise<void> {
        const result = await this.serviceProviderSrv.post(this.model);
        if (result.success) {
            this.matSnack.open('Prestador salvo com sucesso', undefined, {duration: 3000});
            this.router.navigateByUrl('/service-providers');
        }
    }

    async getId(uid: string): Promise<void> {
        if (uid === 'new') {
            return;
        }
        const result = await this.serviceProviderSrv.getById(uid);
        this.model = result.data as ServiceProviderModel;
    }

    selectedFile(file: FileManager): void {
        if (file.base64Data) {
            this.model.photo = file.base64Data;
        }
    }
}
