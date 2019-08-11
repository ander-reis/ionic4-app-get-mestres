import {Entity, Column, ManyToOne} from "typeorm";
import {BaseEntity} from "./BaseEntity";
import {RequestOrder} from "./RequestOrder";
import {Question} from "./Question";

@Entity()
export class RequestAnswers extends BaseEntity {

    @Column({type: 'text', nullable: false})
    answer: string;

    @ManyToOne(() => RequestOrder, {eager: true})
    requestOrder: RequestOrder;

    @ManyToOne(() => Question, {eager: true})
    question: Question;
}
