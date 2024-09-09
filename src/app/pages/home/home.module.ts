import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ClarityModule } from '@clr/angular';
import { HomeService } from './home.service';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ClarityModule
  ],
  providers:[HomeService]
})
export class HomeModule { }
