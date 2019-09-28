import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batterylevel',
  templateUrl: './batterylevel.component.html',
  styleUrls: ['./batterylevel.component.css']
})
export class BatterylevelComponent implements OnInit {
  public BatteryImage = "/assets/charging.jpg"
  timerInteval;
  globalTimer;
  history_id;

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(): void 
    this.timerInteval = setInterval(() => {

    this.Batterylevel();

    Batterylevel(): void {
      this.BatteryImage = "/assets/charging.jpg";
    }
  }
