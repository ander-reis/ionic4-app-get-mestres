import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {BaseService} from "../base/base.service";
import {ResultHttpInterface} from "../interfaces/ResultHttpInterface";
import {environment} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {UserModel} from "../model/UserModel";

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService<UserModel> {

    private loginSubject = new Subject<boolean>();

    constructor(public http: HttpService) {
        super('users', http);
    }

    login(email: string, password: string): Promise<ResultHttpInterface> {
        return this.http.post(`${environment.url_api}/users/auth`, {email, password});
    }

    /**
     * guarda token e user no localstorage
     * @param object
     */
    configureLogin(o: any): void {
        const {token, user} = o.data;

        localStorage.setItem('getmestres:token', token);
        localStorage.setItem('getmestres:user', JSON.stringify(user));

        this.loginSubject.next(this.isStaticLogged);
    }

    get isLogged(): Observable<boolean> {
        return this.loginSubject.asObservable();
    }

    get isStaticLogged(): boolean {
        return !!localStorage.getItem('getmestres:token');
    }

    static get token(): string {
        return localStorage.getItem('getmestres:token');
    }
}
