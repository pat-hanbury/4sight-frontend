import { Component, OnInit } from '@angular/core';
import { Area } from '../models';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  areas: Area[];

  selectedArea: Area;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAreas();
  }

  onSelect(area: Area): void {
    console.log(area);
    this.selectedArea = area;
  }

  getAreas(): void {
    // this is a asyncronos call to the api 
    this.apiService.getAreas().subscribe(data => this.areas = data);
  }


}