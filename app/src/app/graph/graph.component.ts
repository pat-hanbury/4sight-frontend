import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Area, Count } from '../models';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, OnChanges {

  @Input() area : Area;

  chart_type = 'bar';
  chart_title = 'Past and Predicted Population';
  // ADD CHART OPTIONS. 
  chartOptions = {
    responsive: true,
    scales: {
      xAxes: [ 
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Date'
          } 
        }
      ],
      yAxes: [ {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Population'
        }
      } ]
    }
  }

  x_axis_labels: string[] =  [];
  y_axis_data = [
    {
      label: 'Population',
      data: [],
      backgroundColor:[],
      boarderColor:[ ],        
      borderWidth: 1,
    }
  ];

  constructor(
    private apiService: ApiService,   // connection to the backend API
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: any) {
    console.log(changes);
    if (changes['area'] && changes['area'].currentValue !== undefined) {
      // Get the values for count and predicted
      this.get_counts();
    } 
  }

  date_to_label(date: string) : string {
    return date.split(':')[0].concat(":").concat(date.split(':')[1]);
  }

  get_counts(): void {
    console.log("getting the counts")
    this.apiService.getPastCount(this.area.id)
      .subscribe((data) => {
        if (data.counts.length === 0 ){
          data = {"a_id":0,"a_name":"general_testing","counts":[["2020-02-10 15:43:44.564039",3],["2020-02-10 15:28:44.565318",4],["2020-02-10 15:13:44.566446",5],["2020-02-10 14:58:44.567484",6],["2020-02-10 14:43:44.568558",7],["2020-02-10 14:28:44.569733",8],["2020-02-10 14:13:44.570766",9],["2020-02-10 13:58:44.571917",10],["2020-02-10 13:43:44.573030",11],["2020-02-10 13:28:44.574320",12]]};
        }
        console.log(data);
        var tmp_x_label = [];
        var tmp_data = [];
        var label : string = 'NONE'
        for (var i = 0; i < data.counts.length; i++) {
          label = this.date_to_label(data.counts[i][0]);
          if (tmp_x_label.length > 0 && tmp_x_label[tmp_x_label.length - 1] === label) {
            // color and label are alreay set
            tmp_data[tmp_data.length - 1] += data.counts[i][1];
          } else {
            tmp_x_label.push(label);
            tmp_data.push(data.counts[i][1]);

            // add color to the begining
            this.y_axis_data[0].backgroundColor.unshift("#0000FF");
          }
        }

        this.x_axis_labels = tmp_x_label.concat(this.x_axis_labels);
        this.y_axis_data[0].data = tmp_data.concat(this.y_axis_data[0].data);
      });

    this.apiService.getPredictionCount(this.area.id)
    .subscribe((data) => {
      if (data.prediction.length === 0 ){
        data = {"a_id":0,"a_name":"general_testing","prediction":[["2020-02-10 16:28:44.568027",23],["2020-02-10 16:43:44.569057",24],["2020-02-10 16:58:44.570216",25],["2020-02-10 17:13:44.571315",26],["2020-02-10 17:28:44.572470",27],["2020-02-10 17:43:44.573758",28],["2020-02-10 17:58:44.574818",29]]};
      }
      console.log(data);
      var tmp_x_label = [];
      var tmp_data = [];
      var label : string = 'NONE'
        for (var i = 0; i < data.prediction.length; i++) {
          label = this.date_to_label(data.prediction[i][0]);
          if (tmp_x_label.length > 0 && tmp_x_label[tmp_x_label.length - 1] === label) {
            // color and label are alreay set
            tmp_data[tmp_data.length - 1] += data.prediction[i][1];
          } else {
            tmp_x_label.push(label);
            tmp_data.push(data.prediction[i][1]);

            // add color to the end
            this.y_axis_data[0].backgroundColor.push("#FF0000");
          }
        }

      this.x_axis_labels = this.x_axis_labels.concat(tmp_x_label);
      this.y_axis_data[0].data = this.y_axis_data[0].data.concat(tmp_data);
    });
  }

  // CHART CLICK EVENT.
  onChartClick(event) {
    console.log(event);
  }

}



// example for Graph



  // x_axis_labels =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  // // STATIC DATA FOR THE CHART IN JSON FORMAT.
  // y_axis_data = [
  //   {
  //     label: 'Previous data',
  //     data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 30, 45, 33, ],
  //     backgroundColor:[
  //       "#0000FF", "#0000FF", "#0000FF", 
  //       "#0000FF", "#0000FF", "#0000FF", 
  //       "#0000FF", "#0000FF", "#0000FF", 
  //       "#FF0000", "#FF0000", "#FF0000"],
  //     boarderColor:[
  //       "#00FF00", "#00FF00", "#00FF00", 
  //       "#00FF00", "#00FF00", "#00FF00", 
  //       "#00FF00", "#00FF00", "#00FF00", 
  //       "#00FF00", "#00FFFF", "#00FFFF"],        
  //     borderWidth: 1,

  //   }
  // ];
  // CHART COLOR.
  // colors = [
  //   { // actual data
  //     backgroundColor:["#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#0000FF", "#FF0000", "#FF0000", "#FF0000"]
  //   }
  // ];
