import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  car_id: string;
  id: any;

  constructor(private _appService: AppService, private router: Router) {
  }

  ngOnInit() {
    this._appService.getCarByNumber("bravado19").subscribe((car) => {
      this.car_id = car._id;
    }, (err) => {
      console.log(err);
    })

    this.id = setInterval(() => {
      this.carCheck();
    }, 10000);
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
  carCheck(): void {
    if (this.car_id) {
      this._appService.getCarById(this.car_id).subscribe((car) => {
        if (car.car_status.status) {
          console.log("Car is active");
          this.router.navigate(['home']);
        }
      else{
        console.log("Car is not active");
      }
      }, (err) => {
        console.log(err);
      })
    }
  }

}
