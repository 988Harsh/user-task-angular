import { Component, OnInit, OnChanges } from '@angular/core';
import { ApiService } from '../../users/api.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {

  }


}
