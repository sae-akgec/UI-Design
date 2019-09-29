import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-batterylevel',
  templateUrl: './batterylevel.component.html',
  styleUrls: ['./batterylevel.component.css']
})
export class BatterylevelComponent implements OnInit, AfterViewInit, OnDestroy {
  public currentBattery = "/assets/fullbattery.png"
  timerInteval;
  globalTimer;
  public mediumBattery = "/assets/lowbattery.png"

  public lowBattery = "/asstes/charging.png"


  constructor(private _appService: AppService, private router: Router) { }


  ngOnInit() {
  }
  ngAfterViewInit(): void {

    this.timerInteval = setInterval(() => {
      this.batterylevel();
    }, 1000);
  }

  batterylevel(): void {
    this._appService.battery().subscribe(
      (data) => {
        if (data['status'] === true) {
          this.mediumBattery = "/assets/lowbattery.png"

        } else {
          this.lowBattery = "/assets/charging.png"
        }
      }, (err) => {
        console.log("Error :" + err)
      }
    )
  }



}
