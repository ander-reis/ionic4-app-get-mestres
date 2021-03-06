import {UserController} from "./controller/UserController";
import {CategoryController} from "./controller/CategoryController";
import {SubCategoryController} from "./controller/SubCategoryController";
import {QuestionController} from "./controller/QuestionController";
import {CustomerController} from "./controller/CustomerController";
import {ServiceProviderController} from "./controller/ServiceProviderController";
import {RequestOrderController} from "./controller/RequestOrderController";
import {RequestAnswersController} from "./controller/RequestAnswersController";
import {StorageController} from "./controller/StorageController";
import {AddressController} from "./controller/AddressController";

export const Routes = [{method: "get", route: "/users", controller: UserController, action: "all"},

    // users
    {method: "get", route: "/users/:id", controller: UserController, action: "one"},
    {method: "post", route: "/users", controller: UserController, action: "save"},
    {method: "post", route: "/users/create", controller: UserController, action: "createUser"},
    {method: "post", route: "/users/auth", controller: UserController, action: "auth"},
    {method: "delete", route: "/users/:id", controller: UserController, action: "remove"},

    // category
    {method: "get", route: "/category", controller: CategoryController, action: "all"},
    {method: "get", route: "/category/:id/sub-categories", controller: CategoryController, action: "getAllSubCategories"},
    {method: "get", route: "/category/:id", controller: CategoryController, action: "one"},
    {method: "post", route: "/category", controller: CategoryController, action: "save"},
    {method: "delete", route: "/category/:id", controller: CategoryController, action: "remove"},

    // subcategory
    {method: "get", route: "/subcategory", controller: SubCategoryController, action: "all"},
    {method: "get", route: "/subcategory/:id/questions", controller: SubCategoryController, action: "getAllQuestions"},
    {method: "get", route: "/subcategory/:id", controller: SubCategoryController, action: "one"},
    {method: "post", route: "/subcategory", controller: SubCategoryController, action: "save"},
    {method: "delete", route: "/subcategory/:id", controller: SubCategoryController, action: "remove"},

    // question
    {method: "get", route: "/question", controller: QuestionController, action: "all"},
    {method: "get", route: "/question/:id", controller: QuestionController, action: "one"},
    {method: "post", route: "/question", controller: QuestionController, action: "save"},
    {method: "delete", route: "/question/:id", controller: QuestionController, action: "remove"},

    // customer
    {method: "get", route: "/customer", controller: CustomerController, action: "all"},
    {method: "get", route: "/customer/:id", controller: CustomerController, action: "one"},
    {method: "post", route: "/customer", controller: CustomerController, action: "save"},
    {method: "post", route: "/customer/create", controller: CustomerController, action: "createCustomer"},
    {method: "post", route: "/customer/auth", controller: CustomerController, action: "auth"},
    {method: "delete", route: "/customer/:id", controller: CustomerController, action: "remove"},

    // service provider
    {method: "get", route: "/service-provider", controller: ServiceProviderController, action: "all"},
    {method: "get", route: "/service-provider/:id", controller: ServiceProviderController, action: "one"},
    {method: "post", route: "/service-provider", controller: ServiceProviderController, action: "save"},
    {method: "post", route: "/service-provider/create", controller: ServiceProviderController, action: "createServiceProvider"},
    {method: "post", route: "/serviceProvider/auth", controller: ServiceProviderController, action: "auth"},
    {method: "delete", route: "/service-provider/:id", controller: ServiceProviderController, action: "remove"},


    // request
    {method: "get", route: "/request-order", controller: RequestOrderController, action: "all"},
    {method: "get", route: "/request-order/:id", controller: RequestOrderController, action: "one"},
    {method: "post", route: "/request-order", controller: RequestOrderController, action: "save"},
    {method: "delete", route: "/request-order/:id", controller: RequestOrderController, action: "remove"},

    // request answers
    {method: "get", route: "/request-answer/:orderUid/all", controller: RequestAnswersController, action: "all"},
    {method: "post", route: "/request-answer", controller: RequestAnswersController, action: "save"},
    {method: "delete", route: "/request-answer/:id", controller: RequestAnswersController, action: "remove"},

    // storage
    {method: "get", route: "/storage/:filename", controller: StorageController, action: "getFile"},

    // statesCities.json
    {method: "get", route: "/address/", controller: AddressController, action: "getAllStates"},
    {method: "get", route: "/address/:state", controller: AddressController, action: "getAllCities"},
];
