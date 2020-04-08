import {Subject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {environment} from "../environments/environment";
import {UserAuthModel} from "../models/UserAuthModel";
import {UserAuthInterface} from "../interfaces/UserAuthInterface";
import {constants} from "../shared/constants";
import {UserInterface} from "../interfaces/UserInterface";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private subProfile: Subject<string> = new Subject<string>();
    private subUserData: Subject<UserInterface> = new Subject<UserInterface>();

    constructor(public http: HttpService) {
    }

    login(user: UserAuthModel) {
        return this.http.post(`${environment.url_api}/${
            user.profile === 'customer' ? 'customer' : 'serviceProvider'
        }/auth`, user);
    }

    saveDataLoginInfo(data: UserAuthInterface, profile: string) {
        localStorage.setItem(constants.keyStore.user, JSON.stringify(data.user));

        localStorage.setItem(constants.keyStore.token, data.token);
        localStorage.setItem(constants.keyStore.profile, profile);
        this.subUserData.next(this.UserData);
        this.subProfile.next(profile);
    }

    get IsAuth(): boolean {
        const user = this.UserData;
        return (user && !!user.uid);
    }

    get Profile(): string {
        try {
            return localStorage.getItem(constants.keyStore.profile) || '';
        } catch (error) {
            return '';
        }
    }

    get UserDataAsync(): Observable<UserInterface> {
        setTimeout(() => {
            this.subUserData.next(this.UserData);
        }, 100);
        return this.subUserData.asObservable();
    }

    get ProfileAsync(): Observable<string> {
        setTimeout(() => {
            this.subProfile.next(this.Profile);
        }, 100);
        return this.subProfile.asObservable();
    }

    get UserData(): UserInterface {
        try {
            const saved = localStorage.getItem(constants.keyStore.user);
            if (saved) {
                return JSON.parse(saved) as UserInterface
            }
            return {} as UserInterface
        } catch (error) {
            return {} as UserInterface
        }
    }
}
