import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batterylevel',
  templateUrl: './batterylevel.component.html',
  styleUrls: ['./batterylevel.component.css']
})
export class BatterylevelComponent implements OnInit {
  public flameImage = "/assets/flameok.png"
  timerInteval;
  globalTimer;
  isDanger = false;
  status = true;
  history_id;

  constructor() { }

  ngOnInit() {
  }

}
