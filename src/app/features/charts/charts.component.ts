import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { UserService } from 'src/app/features/users/users.service';
import { TaskService } from 'src/app/features/tasks/tasks.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {


  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  users = this.userService.users.length;
  tasks = this.tasksService.tasks.length;
  chartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'No. of Users to Task'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Users And Tasks',
      colorByPoint: true,
      data: [{
        name: 'Users',
        y: this.users,
        sliced: true,
        selected: true
      }, {
        name: 'Tasks',
        y: this.tasks
      }]
    }]


  }; // required
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false



  constructor(private userService: UserService, private tasksService: TaskService) { }

  ngOnInit(): void {
  }

}
