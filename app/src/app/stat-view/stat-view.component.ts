import { Component, OnInit } from '@angular/core';
import { Area } from '../models';
import { getLocaleEraNames } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-stat-view',
  templateUrl: './stat-view.component.html',
  styleUrls: ['./stat-view.component.css']
})
export class StatViewComponent implements OnInit {

  area : Area;

  constructor(
    private route: ActivatedRoute,    // the route that got us here
    private apiService: ApiService   // connection to the backend API
  ) {}

  ngOnInit() { 
    this.getArea();
  }

  getArea(): void {
    const id = +this.route.snapshot.paramMap.get('area_id');
    this.apiService.getArea(id)
      .subscribe(data => this.area = this.apiService.toArea(data));
  }

}
