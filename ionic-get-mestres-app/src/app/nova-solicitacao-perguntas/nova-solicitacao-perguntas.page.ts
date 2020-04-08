import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SubCategoryModel} from "../../models/SubCategoryModel";
import {QuestionModel} from "../../models/QuestionModel";
import {QuestionsService} from "../../services/questions.service";
import {NavController} from "@ionic/angular";
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {RequestOrderModel} from "../../models/RequestOrderModel";

@Component({
  selector: 'app-nova-solicitacao-perguntas',
  templateUrl: './nova-solicitacao-perguntas.page.html',
  styleUrls: ['./nova-solicitacao-perguntas.page.scss'],
})
export class NovaSolicitacaoPerguntasPage implements OnInit {

  subCategory: SubCategoryModel = new SubCategoryModel();
  questions: Array<QuestionModel> = new Array<QuestionModel>();
  answers: any = [];
  request: RequestOrderModel = new RequestOrderModel();

  constructor(
      private router: Router,
      private questionSrv: QuestionsService,
      private navCtrl: NavController,
      private geolocation: Geolocation
  ) { }

  ngOnInit() {
    try {
      const { extras } = this.router.getCurrentNavigation();

      if (extras && extras.state) {
        this.subCategory = extras.state as SubCategoryModel;
        this.loadData();
      } else {
        this.navCtrl.navigateRoot('/tabs');
        // this.router.navigateByUrl('/tabs');
      }
    } catch (error) {
      this.navCtrl.navigateRoot('/tabs');
      // this.router.navigateByUrl('/tabs');
    }
  }

  async loadData(): Promise<void> {
    const result = await this.questionSrv.getAllQuestions(this.subCategory.uid);
    if(result.success) {
      this.questions = result.data as Array<QuestionModel>;
      // console.log(this.questions);
    }
  }

  getOptions(question: QuestionModel) {
    console.log(question.options);
    return question.options.split(',').map(o => o.trim());
  }

  async send() {
    // const { coords } = await this.geolocation.getCurrentPosition();
    // this.request.longlat = `${coords.longitude};${coords.latitude}`;
    // this.request.subCategory = this.subCategory.uid;
  }
}
