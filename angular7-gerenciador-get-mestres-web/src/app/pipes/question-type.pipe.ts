import { Pipe, PipeTransform } from '@angular/core';
import {QuestionService} from "../services/question.service";

@Pipe({
  name: 'questionType'
})
export class QuestionTypePipe implements PipeTransform {

  transform(value: number, args?: any): string {
    try {
      return QuestionService.getQuestionsType().find(x => x.value === value).label;
    }catch (error) {
      return '';
    }
  }
}
