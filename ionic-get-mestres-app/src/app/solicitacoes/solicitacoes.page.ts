import {Component, OnInit} from '@angular/core';
import {RequestOrderModel} from "../../models/RequestOrderModel";

@Component({
    selector: 'app-solicitacoes',
    templateUrl: './solicitacoes.page.html',
    styleUrls: ['./solicitacoes.page.scss'],
})
export class SolicitacoesPage implements OnInit {

    list: Array<RequestOrderModel> = new Array<RequestOrderModel>();

    constructor() {
    }

    ngOnInit() {
    }

}
