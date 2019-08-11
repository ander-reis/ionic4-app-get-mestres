import {Component, OnInit, ViewChild} from '@angular/core';
import {QuestionModel} from "../../model/QuestionModel";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {QuestionService} from "../../services/question.service";
import {Constants} from "../../shared/constants";
import Swal from "sweetalert2";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  columns: string[] = ['Pergunta', 'Tipo', 'SubCategoria', 'uid'];
  dataSource: MatTableDataSource<QuestionModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
      private questionSrv: QuestionService
  ) {
  }

  ngOnInit() {
    this.bind();
  }

  async bind(): Promise<void> {
    const questions = await this.questionSrv.getAll();
    this.dataSource = new MatTableDataSource(questions.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(model: QuestionModel) {
    const options: any = {
      ...Constants.confirm_swal_options, text: `Deseja excluir a pergunta ${model.question}?`
    };
    const {value} = await Swal.fire(options);
    if (value) {
      const result = await this.questionSrv.delete(model.uid);
      if (result.success) {
        this.bind();
      }
    }
  }
}
