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

  constructor(
    private route: ActivatedRoute,    // the route that got us here
    private apiService: ApiService,   // connection to the backend API
    private location: Location        // where did we navigate from
  ) {}

  ngOnInit() {
    this.getArea();
  }

  getArea(): void {
    const id = +this.route.snapshot.paramMap.get('area_id');
    this.apiService.getArea(id)
      .subscribe(data => this.area = this.apiService.toArea(data));
  }

  goBack() {
    this.location.back();
  }

}
