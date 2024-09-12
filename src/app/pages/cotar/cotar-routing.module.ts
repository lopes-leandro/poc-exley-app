import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CotarComponent } from './cotar.component';

const routes: Routes = [
  {
    path: '',
    component: CotarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotarRoutingModule { }
