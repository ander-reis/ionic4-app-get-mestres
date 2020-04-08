import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserAuthModel} from "../../models/UserAuthModel";
import {Router} from "@angular/router";
import {SelectInterface} from "../../interfaces/SelectInterface";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userForm: UserAuthModel = new UserAuthModel();
  profiles: SelectInterface[] = [
    { value: 'customer', label: 'Cliente' },
    { value: 'serviceProvider', label: 'Prestador' }
  ]

  constructor(private userSrv: UserService, private router: Router, private alertSrv: AlertService) { }

  ngOnInit() {
  }

  async login() {
    const { email, password, profile } = this.userForm;

    if(!email || !password || !profile) {
      this.alertSrv.alert('Atenção', 'Preencha todos os dados!');
      return;
    }

    const { success, data } = await this.userSrv.login(this.userForm);

    if(success) {
      console.log(data);
      this.userSrv.saveDataLoginInfo(data, this.userForm.profile);
      this.router.navigateByUrl('/tabs');
    }
  }
}
