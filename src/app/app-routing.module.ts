import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { TransmittersComponent } from './transmitters/transmitters.component';
import { TransmitterDetailComponent }  from './transmitter-detail/transmitter-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/transmitters', pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: TransmitterDetailComponent },
  { path: 'transmitters', component: TransmittersComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
