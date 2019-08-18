import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CategoriesComponent} from "./pages/categories/categories.component";
import {CategoryComponent} from "./pages/category/category.component";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {AdminGuard} from "./shared/admin.guard";
import {SubCategoryComponent} from "./pages/sub-category/sub-category.component";
import {SubCategoriesComponent} from "./pages/sub-categories/sub-categories.component";
import {QuestionsComponent} from "./pages/questions/questions.component";
import {QuestionComponent} from "./pages/question/question.component";
import {CustomerComponent} from "./pages/customer/customer.component";
import {CustomersComponent} from "./pages/customers/customers.component";
import {ServiceProviderComponent} from "./pages/service-provider/service-provider.component";
import {ServiceProvidersComponent} from "./pages/service-providers/service-providers.component";

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/home'},
    {path: 'home', component: HomeComponent, canActivate: [AdminGuard]},
    {path: 'login', component: LoginComponent},

    {path: 'categories', component: CategoriesComponent, canActivate: [AdminGuard]},
    {path: 'category/:id', component: CategoryComponent, canActivate: [AdminGuard]},

    {path: 'sub-categories', component: SubCategoriesComponent, canActivate: [AdminGuard]},
    {path: 'sub-category/:id', component: SubCategoryComponent, canActivate: [AdminGuard]},

    {path: 'questions', component: QuestionsComponent, canActivate: [AdminGuard]},
    {path: 'question/:id', component: QuestionComponent, canActivate: [AdminGuard]},

    {path: 'customers', component: CustomersComponent, canActivate: [AdminGuard]},
    {path: 'customer/:id', component: CustomerComponent, canActivate: [AdminGuard]},

    {path: 'service-providers', component: ServiceProvidersComponent, canActivate: [AdminGuard]},
    {path: 'service-provider/:id', component: ServiceProviderComponent, canActivate: [AdminGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
