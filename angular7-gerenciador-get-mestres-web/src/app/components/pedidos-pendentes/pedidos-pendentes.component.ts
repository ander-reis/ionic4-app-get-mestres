import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {PedidosPendentesInterface} from "../../interfaces/PedidosPedentesInterface";

const DATA_MOCK: PedidosPendentesInterface[] = [
    {customerName: 'Usuário Teste', date: '10/10/2010', category: 'Contrução', subCategory: 'Reforma'},
    {customerName: 'Usuário Teste', date: '10/10/2010', category: 'Contrução', subCategory: 'Reforma'},
    {customerName: 'Usuário Teste', date: '10/10/2010', category: 'Contrução', subCategory: 'Reforma'},
    {customerName: 'Usuário Teste', date: '10/10/2010', category: 'Contrução', subCategory: 'Reforma'},
]

@Component({
    selector: 'app-pedidos-pendentes',
    templateUrl: './pedidos-pendentes.component.html',
    styleUrls: ['./pedidos-pendentes.component.scss']
})
export class PedidosPendentesComponent implements OnInit {

    columns: string[] = ['Nome', 'Data', 'Categoria', 'SubCategoria'];
    dataSource: MatTableDataSource<PedidosPendentesInterface> = new MatTableDataSource<PedidosPendentesInterface>(DATA_MOCK);

    constructor() {
    }

    ngOnInit() {
    }

}
