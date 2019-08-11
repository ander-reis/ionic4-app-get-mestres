import {Entity, Column, ManyToOne} from "typeorm";
import {BaseEntity} from "./BaseEntity";
import {RequestStatus} from "./enum/RequestStatus";
import {Customer} from "./Customer";
import {ServiceProvider} from "./ServiceProvider";
import {SubCategory} from "./SubCategory";

@Entity()
export class RequestOrder extends BaseEntity {

    @Column({type: 'varchar', length: 100})
    longlat: string;

    @Column({type: 'varchar', length: 200})
    title: string;

    @Column({type: 'text'})
    description: string;

    @Column()
    statusOrder: RequestStatus;

    @ManyToOne(() => Customer, {eager: true})
    customer: Customer;

    @ManyToOne(() => ServiceProvider, {eager: true, nullable: true})
    serviceProvider: ServiceProvider;

    @ManyToOne(() => SubCategory, {eager: true})
    subCategory: SubCategory;
}
