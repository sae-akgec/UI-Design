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
  batterylevel(): void {
    this._appService.batterylevel().subscribe(
      (data) => {
        if (data['batterypercent'] > 75) {
          this.batteryimage = "/assets/battery1.png";

        } else {
          this.batteryimage = "/assets/battery2.png";
        }
      }, (err) => {
        console.log("Error :" + err)
      }
    )
  }
}
