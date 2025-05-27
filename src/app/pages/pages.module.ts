import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LightboxModule } from 'ngx-lightbox';

// Emoji Picker
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardsModule } from './dashboards/dashboards.module';
import { EcommerceModule } from './ecommerce/ecommerce.module';


import { InvoicesModule } from './invoices/invoices.module';

import { TasksModule } from './tasks/tasks.module';




import { FormModule } from './form/form.module';

import { IconsModule } from './icons/icons.module';
import { ChartModule } from './chart/chart.module';

import { MapsModule } from './maps/maps.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReviewComponent } from './ecommerce/review/review.component';


@NgModule(
        {
                declarations: [
    
  
    ReviewComponent,
  ],
                imports: [CommonModule,
                        FormsModule,
                        BsDropdownModule.forRoot(),
                        ModalModule.forRoot(),
                        PagesRoutingModule,
                        NgApexchartsModule,
                        ReactiveFormsModule,
                        DashboardsModule,
                       // EcommerceModule ,
                      
                        
                        InvoicesModule,
                       
                        TasksModule,
                     
                    
                      
                        
                        FormModule,
                        
                        IconsModule,
                        ChartModule,
                        MapsModule,
                        FullCalendarModule,
                        TabsModule.forRoot(),
                        TooltipModule.forRoot(),
                        CollapseModule.forRoot(),
                        AlertModule.forRoot(),
                        SimplebarAngularModule,
                        LightboxModule,
                        PickerModule],
                providers: [provideHttpClient(withInterceptorsFromDi())]
        })
export class PagesModule { }
