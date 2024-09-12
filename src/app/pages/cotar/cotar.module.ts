import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotarRoutingModule } from './cotar-routing.module';
import { CotarComponent } from './cotar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { CotarService } from './cotar.service';


@NgModule({
  declarations: [
    CotarComponent
  ],
  imports: [
    CommonModule,
    CotarRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule
  ],
  providers: [CotarService]
})
export class CotarModule { }
