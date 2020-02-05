import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  chart_type = 'bar';

  chart_title = 'Bar Chart Example in Angular 4';

  // ADD CHART OPTIONS. 
  chartOptions = {
    responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }

  x_axis_labels =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  y_axis_data = [
    {
      label: 'Previous data',
      data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 30, 45, 33, ],
      backgroundColor:[
        "#0000FF", "#0000FF", "#0000FF", 
        "#0000FF", "#0000FF", "#0000FF", 
        "#0000FF", "#0000FF", "#0000FF", 
        "#FF0000", "#FF0000", "#FF0000"],
      boarderColor:[
        "#00FF00", "#00FF00", "#00FF00", 
        "#00FF00", "#00FF00", "#00FF00", 
        "#00FF00", "#00FF00", "#00FF00", 
        "#00FF00", "#00FFFF", "#00FFFF"],        
      borderWidth: 1,

    }
  ];

  // CHART COLOR.
  colors = [
    { // actual data
      backgroundColor:["#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#FF0000", "#FF0000", "#FF0000"]
    }
  ];
  
  // CHART CLICK EVENT.
  onChartClick(event) {
    console.log(event);
  }

}
