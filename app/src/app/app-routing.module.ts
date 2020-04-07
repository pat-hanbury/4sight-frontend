import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedViewComponent } from './feed-view/feed-view.component';
import { StatViewComponent } from './stat-view/stat-view.component';


const routes: Routes = [
  { path: '', redirectTo: '/areas', pathMatch: 'full' },
  { path: 'areas', component: DashboardComponent },
  { path: 'feeds/:area_id', component: FeedViewComponent },
  { path: 'stats/:area_id', component: StatViewComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
