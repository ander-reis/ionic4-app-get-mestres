import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {SolicitacoesPage} from './solicitacoes.page';
import {PipesModules} from "../../pipes/pipes.modules";

const routes: Routes = [
    {
        path: '',
        component: SolicitacoesPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        PipesModules
    ],
    declarations: [SolicitacoesPage]
})
export class SolicitacoesPageModule {
}
