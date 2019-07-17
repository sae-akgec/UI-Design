import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  des_lat=28.346678;
  des_lng=77.534380;
  constructor(private _appService:AppService) { }

  ngOnInit() {
  }

  placeMarker($event){
    this._appService.lat = $event.coords.lat;
    this._appService.lng = $event.coords.lng;
    this.des_lat = this._appService.lat;
    this.des_lng = this._appService.lng;
  }
}
