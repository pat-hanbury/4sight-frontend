import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ApiService }  from '../api.service';
import { Area, Feed } from '../models';

@Component({
  selector: 'app-feed-view',
  templateUrl: './feed-view.component.html',
  styleUrls: ['./feed-view.component.css']
})
export class FeedViewComponent implements OnInit {

  area: Area;

  feeds: Feed[];

  constructor(
    private route: ActivatedRoute,    // the route that got us here
    private apiService: ApiService,   // connection to the backend API
    private location: Location        // where did we navigate from
  ) {}

  ngOnInit() {
    this.getArea();
    this.getFeeds();
  }

  getArea(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.apiService.getArea(id)
      .subscribe(data => this.area = data);
  }

  getFeeds() {
    console.log("get feeds");
    this.apiService.getFeed(this.area.id).subscribe(data => this.feeds = [data]);  // TODO: choose feed differently
  }

  goBack() {
    this.location.back();
  }

}
