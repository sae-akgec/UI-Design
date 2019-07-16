import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _appService:AppService) { }

  ngOnInit() {
  }

  turnOff():void{
    this._appService.shutdown().subscribe((msg)=>{
      console.log(msg);
    }, (err)=>{
      console.log(err);
    })
    console.log("Car turned Off");
  }

}
