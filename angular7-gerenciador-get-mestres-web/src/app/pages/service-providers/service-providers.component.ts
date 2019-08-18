import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {ServiceProviderModel} from "../../model/serviceProviderModel";
import {ServiceProviderService} from "../../services/service-provider.service";
import {Constants} from "../../shared/constants";
import Swal from "sweetalert2";

@Component({
  selector: 'app-service-providers',
  templateUrl: './service-providers.component.html',
  styleUrls: ['./service-providers.component.scss']
})
export class ServiceProvidersComponent implements OnInit {

  columns: string[] = ['Nome', 'E-mail', 'uid'];
  dataSource: MatTableDataSource<ServiceProviderModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
      private serviceProvidersSrv: ServiceProviderService
  ) {
  }

  ngOnInit() {
    this.bind();
  }

  async bind(): Promise<void> {
    const serviceProvider = await this.serviceProvidersSrv.getAll();
    this.dataSource = new MatTableDataSource(serviceProvider.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(model: ServiceProviderModel): Promise<void> {
    const options: any = {
      ...Constants.confirm_swal_options, text: `Deseja excluir o prestador ${model.name}?`
    };
    const {value} = await Swal.fire(options);
    if (value) {
      const result = await this.serviceProvidersSrv.delete(model.uid);
      if (result.success) {
        this.bind();
      }
    }
  }
}
