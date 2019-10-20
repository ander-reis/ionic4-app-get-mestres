import {Injectable} from '@angular/core';
import {AlertController, ToastController} from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(
        private alertCtrl: AlertController,
        private toastCtrl: ToastController
    ) {
    }

    /**
     * criacao toast
     * @param title
     * @param position
     */
    async toast(title: string, position: any = 'top'): Promise<void> {
        const toast = await this.toastCtrl.create({message: title, position, duration: 3000});
        await toast.present();
    }

    /**
     * criacao alert
     * @param title
     * @param message
     */
    async alert(title: string, message: string): Promise<void> {
        const alert = await this.alertCtrl.create({
            header: title,
            message,
            buttons: ['ok'],
            backdropDismiss: false
        });
        await alert.present();
    }

    /**
     * criacao alert confirm
     * @param title
     * @param message
     * @param callback
     */
    async confirm(title: string, message: string, callback: any): Promise<void> {
        const alert = await this.alertCtrl.create({
            header: title,
            message,
            buttons: [
                {
                    text: 'Não', role: 'Cancel', handler: () => {
                        console.log('Confirm: No');
                    }
                },
                {
                    text: 'Sim', handler: () => {
                        callback();
                    }
                }
            ]
        });
        await alert.present();
    }
}
