import {Injectable} from '@angular/core';
import {LoadingController} from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    private spinner: HTMLIonLoadingElement = null;

    constructor(private loadingCtrl: LoadingController) {
    }

    /**
     * mostra spinner
     * @param message
     */
    async show(message?: string): Promise<void> {
        if (this.spinner === null) {
            this.spinner = await this.loadingCtrl.create({message: (message || 'Carregando...')});
            await this.spinner.present();
        }
    }

    /**
     * fecha spinner
     */
    hide(): void {
        if (this.spinner != null) {
            this.spinner.dismiss();
            this.spinner = null;
        }
    }
}
