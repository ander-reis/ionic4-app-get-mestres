import {Component, OnInit} from '@angular/core';
import {SubCategoryModel} from "../../model/SubCategoryModel";
import {SubCategoryService} from "../../services/sub-category.service";
import {MatSnackBar} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionModel} from "../../model/QuestionModel";
import {QuestionService} from "../../services/question.service";
import {SelectInterface} from "../../interfaces/SelectInterface";

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

    model: QuestionModel = new QuestionModel();
    subCategories: Array<SubCategoryModel>;
    questionsType: Array<SelectInterface>;

    constructor(
        private subCategorySrv: SubCategoryService,
        private questionSrv: QuestionService,
        private matSnack: MatSnackBar,
        private router: Router,
        private active: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.active.params.subscribe(p => this.getId(p.id));
        this.questionsType = QuestionService.getQuestionsType();
        this.bindSubCategories();
    }

    async bindSubCategories(): Promise<void> {
        const result = await this.subCategorySrv.getAll();
        if (result.success) {
            this.subCategories = result.data as Array<SubCategoryModel>;
        }
    }

    async save(): Promise<void> {
        const result = await this.questionSrv.post(this.model);
        if (result.success) {
            this.matSnack.open('Pergunta salva com sucesso', undefined, {duration: 3000});
            this.router.navigateByUrl('/questions');
        }
    }

    async getId(uid: string): Promise<void> {
        if (uid === 'new') {
            return;
        }
        const result = await this.questionSrv.getById(uid);
        this.model = result.data as QuestionModel;
    }
}
