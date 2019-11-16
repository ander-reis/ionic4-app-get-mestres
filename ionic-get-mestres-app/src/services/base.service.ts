import {environment} from '../environments/environment';
import {HttpService} from './http.service';
import {ResultHttpInterface} from '../interfaces/ResultHttpInterface';

export abstract class BaseService<T> {

    urlBase: string = '';

    constructor(
        public url: string,
        public http: HttpService) {
        this.urlBase = `${environment.url_api}/${this.url}`;
    }

    public getAll(): Promise<ResultHttpInterface> {
        return this.http.get(this.urlBase);
    }

    public getById(uid: string): Promise<ResultHttpInterface> {
        return this.http.get(`${this.urlBase}/${uid}`);
    }

    public post(model: T): Promise<ResultHttpInterface> {
        return this.http.post(this.urlBase, model);
    }

    public delete(uid: string): Promise<ResultHttpInterface> {
        return this.http.delete(`${this.urlBase}/${uid}`);
    }
}
