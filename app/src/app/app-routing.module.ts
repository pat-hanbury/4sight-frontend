import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedViewComponent } from './feed-view/feed-view.component';
import { StatViewComponent } from './stat-view/stat-view.component';


const routes: Routes = [
  { path: '', redirectTo: '/areas', pathMatch: 'full' },
  { path: 'areas', component: DashboardComponent },
  { path: 'feeds', component: FeedViewComponent },
  { path: 'stats', component: StatViewComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
