import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedViewComponent } from './feed-view/feed-view.component';
import { StatViewComponent } from './stat-view/stat-view.component';
import { GraphComponent } from './graph/graph.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    FeedViewComponent,
    StatViewComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule, 
    HttpClientModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
