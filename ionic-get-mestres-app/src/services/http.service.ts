import { Injectable } from '@angular/core';
import {ResultHttpInterface} from "../../../angular7-gerenciador-get-mestres-web/src/app/interfaces/ResultHttpInterface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AlertService} from "./alert.service";
import {SpinnerService} from "./spinner.service";
import {constants} from "../shared/constants";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
      private http: HttpClient,
      private alertSrv: AlertService,
      private spinnerSrv: SpinnerService
  ) {
  }

  private createHeader(header?: HttpHeaders): HttpHeaders {

    if (!header) {
      header = new HttpHeaders();
    }

    header = header.append('Content-Type', 'application/json');
    header = header.append('Accept', 'application/json');

    const token = localStorage.getItem(constants.keyStore.token);
    if (token) {
      //console.log('token http.service: ', token);
      header = header.append('x-access-token', token);
    }
    return header;
  }

  public get(url: string): Promise<ResultHttpInterface> {
    const header = this.createHeader();

    /**
     * modelo com async / await
     */
    return new Promise<ResultHttpInterface>(async (resolve) => {
      // return new Promise(async (resolve) => {
      try {
        await this.spinnerSrv.show();
        // console.log(header);
        const res = await this.http.get(url, {headers: header}).toPromise();
        resolve({success: true, data: res, error: undefined});
        await this.spinnerSrv.hide();
      } catch (error) {
        await await this.spinnerSrv.hide();
        resolve({success: false, data: {}, error: error});
      }
    });
  }

  public post(url: string, model: any): Promise<ResultHttpInterface> {
    const header = this.createHeader();

    return new Promise(async (resolve) => {
      try {
        await this.spinnerSrv.show();
        const res = await this.http.post(url, model, {headers: header}).toPromise();
        resolve({success: true, data: res, error: undefined});
        await this.spinnerSrv.hide();
      } catch (error) {

        await this.spinnerSrv.hide();

        if (error.status === 400) {
          let errorText = '<ul>';
          if (Array.isArray(error.error)) {
            error.error.forEach(element => {
              errorText += `<li style="text-align: left">${element.message || element}</li>;`
            });
            errorText += '</ul>';
            await this.alertSrv.alert('Atenção', errorText);
          }
        }

        if (error.status === 404) {
          await this.alertSrv.alert('Atenção', error.error);
        }

        resolve({success: false, data: {}, error: error});
      }
    });
  }

  public delete(url: string): Promise<ResultHttpInterface> {
    const header = this.createHeader();

    return new Promise(async (resolve) => {
      try {
        await this.spinnerSrv.show();
        const res = await this.http.delete(url, {headers: header}).toPromise();
        resolve({success: true, data: res, error: undefined});
        await this.spinnerSrv.hide();
      } catch (error) {
        await this.spinnerSrv.hide();
        resolve({success: false, data: {}, error: error});
      }
    });
  }
}

