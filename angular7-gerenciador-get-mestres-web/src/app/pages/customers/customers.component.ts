import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomerModel} from "../../model/CustomerModel";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {CustomerService} from "../../services/customer.service";
import Swal from "sweetalert2";
import {Constants} from "../../shared/constants";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  columns: string[] = ['Nome', 'E-mail', 'uid'];
  dataSource: MatTableDataSource<CustomerModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
      private customerSrv: CustomerService
  ) {
  }

  ngOnInit() {
    this.bind();
  }

  async bind(): Promise<void> {
    const questions = await this.customerSrv.getAll();
    this.dataSource = new MatTableDataSource(questions.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(model: CustomerModel): Promise<void> {
    const options: any = {
      ...Constants.confirm_swal_options, text: `Deseja excluir o cliente ${model.name}?`
    };
    const {value} = await Swal.fire(options);
    if (value) {
      const result = await this.customerSrv.delete(model.uid);
      if (result.success) {
        this.bind();
      }
    }
  }
}
