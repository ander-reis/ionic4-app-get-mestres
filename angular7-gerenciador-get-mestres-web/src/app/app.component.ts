import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import {MenuInterface} from "./interfaces/MenuInterface";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'angular7-gerenciador';
    isLogged: boolean = false;
    menu: Array<MenuInterface> = new Array<MenuInterface>();

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.isLogged = this.userService.isStaticLogged;
        this.userService.isLogged.subscribe(logged => {
            this.isLogged = logged;
        });

        // carrega menu
        this.menu.push({
           group: 'Cadastros',
           items: [
               {icon: 'bookmark', label: 'Categorias', url: '/categories'},
               {icon: 'bookmark_border', label: 'SubCategorias', url: '/sub-categories'},
               {icon: 'assignment', label: 'Questões', url: '/questions'},
           ]
        });

        this.menu.push({
            group: 'Pessoas',
            items: [
                {icon: 'person', label: 'Profissionais', url: '/'},
                {icon: 'person_pin', label: 'Clientes', url: '/customers'},
            ]
        });

        this.menu.push({
            group: 'Segurança',
            items: [
                {icon: 'security', label: 'Usuários', url: '/'},
            ]
        });

        this.menu.push({
            group: 'Gerenciamento',
            items: [
                {icon: 'format_list_bulleted', label: 'Pedidos', url: '/'},
            ]
        });
    }
}
