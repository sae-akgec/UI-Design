import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public histories = [];
  constructor(private _appService:AppService) { }

  ngOnInit() {
    this._appService.getCarHistories().subscribe(
      (histories)=>{
        console.log(histories);
        this.histories = histories;
      }, (err)=>{
        console.log(err)
      }
    )
  }

}
