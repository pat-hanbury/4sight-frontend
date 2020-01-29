import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  areas: Area[] = [
    {id: 1, name: "area 1", img: "image to display"}, 
    {id: 2, name: "area 2", img: "image to display"}, 
    {id: 3, name: "area 3", img: "image to display"}, 
    {id: 4, name: "area 4", img: "image to display"}, 
    {id: 5, name: "area 5", img: "image to display"}, 
  ];

  selectedArea: Area;

  constructor() { }

  ngOnInit() {
  }

  onSelect(area) {
    console.log(area);
    this.selectedArea = area;
  }

}


export class Area {
  id: number;
  name: string;
  img: string;
}