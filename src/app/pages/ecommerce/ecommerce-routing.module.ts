import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './product/products/products.component';
import { ProductdetailComponent } from './product/productdetail/productdetail.component';
//import { ShopsComponent } from './shops/shops.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { AddproductComponent } from './product/addproduct/addproduct.component';
import { CustomersComponent } from './customer/customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
import { CategoryPagesComponent } from './categories/category-pages/category-pages.component';


import { ComplaintsComponent } from './complaint/complaints/complaints.component';

import { ListcomplaintsComponent } from './complaint/listcomplaints/listcomplaints.component';
import { RepportAccidentComponent } from './accident/repport-accident/repport-accident.component';
import { ListaccidentComponent } from './accident/listaccident/listaccident.component';
import { SupplierComponent } from './supplier/supplier/supplier.component';
import { ReviewComponent } from './review/review.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { EvaluationFormComponent } from './evaluation/evaluation-form/evaluation-form.component';
import { EvaluationStatsComponent } from './evaluation/evaluation-stats/evaluation-stats.component';
import { AdminAccidentMapComponent } from './accident/admin-accident-map/admin-accident-map.component';
import { EditproductComponent } from './product/editproduct/editproduct.component';




const routes: Routes = [
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'product-detail/:id',
        component: ProductdetailComponent
    },
    {
        path: 'editproduct',
        component: EditproductComponent
    },
    
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'add-product',
        component: AddproductComponent
    },
   
    {
        path: 'orders',
        component: OrdersComponent
    },
    {
        path: 'categories',
        component: CategoryPagesComponent
    },
   
     {
        path: 'customers',
        component: CustomersComponent
    },
    {
        path: 'complaints',
        component:ComplaintsComponent
    },
   ,
   {
    path:'listcomplaints',
    component:ListcomplaintsComponent
},

{
    path:'repportAccident',
    component:RepportAccidentComponent
},
{
    path:'listaccidents',
    component:ListaccidentComponent
},
{
    path:'accidentMap',
    component:AdminAccidentMapComponent
},
{
    path:'supplier',
    component:SupplierComponent
},
{
    path:'review',
    component:ReviewComponent
},
{
    path:'upload',
    component:FileUploadComponent
},
{
    path:'evaluation',
    component:EvaluationFormComponent
},
{
    path:'evaluationStats',
    component:EvaluationStatsComponent
},





];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EcommerceRoutingModule { }
