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
import {AddressStateInterface} from "../../interfaces/AddressStateInterface";

@Component({
    selector: 'app-service-provider',
    templateUrl: './service-provider.component.html',
    styleUrls: ['./service-provider.component.scss']
})
export class ServiceProviderComponent implements OnInit {

    model: ServiceProviderModel = new ServiceProviderModel();
    categoriesCare: Array<string> = new Array<string>();
    subCategoriesSelect: Array<SubCategoryModel> = new Array<SubCategoryModel>();
    categories: Array<CategoryModel>;
    subCategories: Array<SubCategoryModel>;
    subCategorySelect: SubCategoryModel = new SubCategoryModel();
    categorySelect: string = '';
    cities: Array<string> = new Array<string>();
    citiesCare: Array<string> = new Array<string>();
    states: Array<AddressStateInterface> = new Array<AddressStateInterface>();

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
        this.bindStates();
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

    async bindStates(): Promise<void> {
        const result = await this.addressSrv.getAllStates();
        if (result.success) {
            this.states = result.data as Array<AddressStateInterface>;
        }
    }

    async bindCities(state: string): Promise<void> {
        this.citiesCare = new Array<string>();
        const result = await this.addressSrv.getAllCities(state);
        if (result.success) {
            this.cities = result.data as Array<string>;
        }
    }

    async save(): Promise<void> {
        this.model.citiesCare = this.citiesCare.join(', ');
        this.model.categoriesCare = this.categoriesCare.join(', ');
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
        this.bindCities(this.model.state);
        this.citiesCare = this.model.citiesCare.split(',');
        this.categoriesCare = this.model.categoriesCare.split(',');
    }

    selectedFile(file: FileManager): void {
        if (file.base64Data) {
            this.model.photo = file.base64Data;
        }
    }

    selectSubCategory(subCategory: SubCategoryModel): void {
        const exists = this.categoriesCare.filter(x => x === subCategory.name).length > 0;
        if (!exists) {
            this.categoriesCare.push(subCategory.name);
        } else {
            this.matSnack.open(`A SubCategoria ${subCategory.name} já foi adicionada!`, undefined, {duration: 3000});
        }
    }

    selectCityCare(city: any): void {
        const exists = this.citiesCare.indexOf(city) > -1;
        if (!exists) {
            this.citiesCare.push(city);
        } else {
            this.matSnack.open(`A Cidade ${city} já foi adicionada!`, undefined, { duration: 3000 });
        }
    }

    removeCitiesCare(index: number): void {
        this.citiesCare.splice(index, 1);
    }

    removeCategoryCare(index: number): void {
        this.categoriesCare.splice(index, 1);
    }
}
