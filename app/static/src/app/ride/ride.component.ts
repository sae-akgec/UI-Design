import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit {

  public lat = 28.348678;
  public lng = 77.537380;
 
  public origin: any;
  public destination: any;

  constructor() { }

  ngOnInit() {
    this.getDirection();
  }

  getDirection() {
    this.origin = { lat: 28.348678, lng: 77.537380 };
    this.destination = { lat: 28.346678, lng: 77.534380 };
  }

}
