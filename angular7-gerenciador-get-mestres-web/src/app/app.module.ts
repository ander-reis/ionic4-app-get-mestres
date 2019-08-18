import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatPaginatorIntl,
    MatSelectModule
} from "@angular/material";
import {PedidosPendentesComponent} from './components/pedidos-pendentes/pedidos-pendentes.component';
import {CardsDashboardComponent} from './components/cards-dashboard/cards-dashboard.component';
import {CategoriesComponent} from './pages/categories/categories.component';
import {CategoryComponent} from './pages/category/category.component';
import {HttpClientModule} from "@angular/common/http";
import {NgxSpinnerModule} from "ngx-spinner";
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {getPaginatorIntl} from "./shared/paginator-intl";
import {SubCategoryComponent} from './pages/sub-category/sub-category.component';
import {SubCategoriesComponent} from './pages/sub-categories/sub-categories.component';
import {QuestionsComponent} from './pages/questions/questions.component';
import {QuestionComponent} from './pages/question/question.component';
import { QuestionTypePipe } from './pipes/question-type.pipe';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { ServiceProviderComponent } from './pages/service-provider/service-provider.component';
import { ServiceProvidersComponent } from './pages/service-providers/service-providers.component';

@NgModule({
    declarations: [
        AppComponent,
        PedidosPendentesComponent,
        CardsDashboardComponent,
        CategoriesComponent,
        CategoryComponent,
        HomeComponent,
        LoginComponent,
        SubCategoryComponent,
        SubCategoriesComponent,
        QuestionsComponent,
        QuestionComponent,
        QuestionTypePipe,
        CustomerComponent,
        CustomersComponent,
        InputFileComponent,
        ServiceProviderComponent,
        ServiceProvidersComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatTableModule,
        MatCardModule,
        MatInputModule,
        NgxSpinnerModule,
        HttpClientModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatSelectModule,
    ],
    providers: [{
        provide: MatPaginatorIntl, useValue: getPaginatorIntl()
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
