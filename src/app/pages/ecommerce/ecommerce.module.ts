import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
// module
import { EcommerceRoutingModule } from './ecommerce-routing.module';

// bootstrap module
import { NgxSliderModule } from 'ngx-slider-v2';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';
// component
import { ProductsComponent } from './product/products/products.component';
import { ProductdetailComponent } from './product/productdetail/productdetail.component';
//import { ShopsComponent } from './shops/shops.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { AddproductComponent } from './product/addproduct/addproduct.component';
import { CustomersComponent } from './customer/customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
// dropzone
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

import { CategoryPagesComponent } from './categories/category-pages/category-pages.component';
import { BouttonActionComponent } from './boutton-action/boutton-action.component';

import { ComplaintsComponent } from './complaint/complaints/complaints.component';

//import matieriel requis
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListcomplaintsComponent } from './complaint/listcomplaints/listcomplaints.component';
import { RepportAccidentComponent } from './accident/repport-accident/repport-accident.component';
import { ListaccidentComponent } from './accident/listaccident/listaccident.component';
import { SupplierComponent } from './supplier/supplier/supplier.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { EvaluationFormComponent } from './evaluation/evaluation-form/evaluation-form.component';
import { EvaluationStatsComponent } from './evaluation/evaluation-stats/evaluation-stats.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AdminAccidentMapComponent } from './accident/admin-accident-map/admin-accident-map.component';
import { EditproductComponent } from './product/editproduct/editproduct.component';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [ProductsComponent,
     ProductdetailComponent, 
      CheckoutComponent, 
      CartComponent,
       AddproductComponent, 
       CustomersComponent, 
       OrdersComponent, 
       
        CategoryPagesComponent,
        BouttonActionComponent,
        
        ComplaintsComponent,
  
        ListcomplaintsComponent,
        RepportAccidentComponent,
        ListaccidentComponent,
        SupplierComponent,
        FileUploadComponent,
        EvaluationFormComponent,
        EvaluationStatsComponent,
        AdminAccidentMapComponent,
        EditproductComponent,
      
        
      ],
  imports: [
    CommonModule,
    EcommerceRoutingModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    SlickCarouselModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    NgxSliderModule,
    NgSelectModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DropzoneModule,
    PagetitleComponent,
    MatFormFieldModule, 
    MatInputModule,  
    MatSelectModule, 
    MatProgressSpinnerModule,
    NgbModule ,
    NgbDropdownModule,
    TabsModule.forRoot(),
    FormsModule,
     NgApexchartsModule
  ],
  providers: [
    DatePipe,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],

})
export class EcommerceModule { }
