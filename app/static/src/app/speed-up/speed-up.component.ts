import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speed-up',
  templateUrl: './speed-up.component.html',
  styleUrls: ['./speed-up.component.css']
})
export class SpeedUpComponent implements OnInit {
  public carSpeed = 0;

  constructor() { }

  ngOnInit() {
  }

}
