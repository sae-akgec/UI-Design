import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit, AfterViewInit, OnDestroy {

  public start_lat = 28.348678;
  public start_lng = 77.537380;

  public current_lat = 28.348678;
  public current_lng = 77.537380;
  public speed = 52
  public avgspeed = 63


  public origin: any;
  public destination: any;

  public carSpeed = 0;

  public flameImage = "/assets/flameok.png"
  timerInteval;
  globalTimer;
  isDanger = false;
  status = true;
  history_id;

  constructor(private _appService: AppService, private router: Router) { }

  ngOnInit() {
    this.getDirection();
    this._appService.caron().subscribe((done) => {
      console.log(done);
    }, (err) => {
      console.log(err);
    })

    this.addCarHistory();
  }
  addCarHistory() {
    let data = {
      "car_id": this._appService.car['_id'],
      "driver_id": this._appService.car.car_status['driver_id'] || "1111111",
      "driver_name": "Rishabh Jain",
      "start_lat": String(this.start_lat),
      "start_lng": String(this.start_lng),
      "end_lat": String(this._appService.lat),
      "end_lng": String(this._appService.lng)
    }

    this._appService.addCarHistory(data).subscribe(
      (history) => {
        this.history_id = history._id;
        console.log(history);
      }, (err) => {
        console.log(err);
      }
    )
  }

  ngAfterViewInit(): void {
    this.globalTimer = setInterval(() => {
      this.updateCar();
    }, 10000)
    this.timerInteval = setInterval(() => {
      this.flameSensor();
      this._appService.gps().subscribe((data) => {
        this.current_lat = data['lat'];
        this.current_lng = data['lng'];
        this.checkGeofencing();
      }, (err) => {
        console.log(err);
      });
    }, 1000);
  }
  updateCar() {
    let data = {
      "current_lat": String(this.current_lat),
      "current_lon": String(this.current_lng),
      "is_danger": this.isDanger,
      "status": this.status
    }

    this._appService.updateCarStatus(data).subscribe(
      (car) => {
        console.log(car);
      }, (err) => {
        console.log(err);
      })
  }

  getDirection() {
    this.origin = { lat: this.start_lat, lng: this.start_lng };
    this.destination = { lat: this._appService.lat, lng: this._appService.lng };
  }

  flameSensor(): void {
    this._appService.flame().subscribe(
      (data) => {
        if (data['status'] === true) {
          this.flameImage = "/assets/flame.jpeg";
          this.mailDanger("Fire");
        } else {
          this.flameImage = "/assets/flameok.png";
        }
      }, (err) => {
        console.log("Error :" + err)
      }
    )
  }




  mailDanger(sub: string) {
    let mail = {
      "sub": sub,
      "body": `Your car ${this._appService.car['car_no']} is set on fire at ${this.current_lat} and ${this.current_lng}`,
      "email": this._appService.car['danger_email']
    }
    this.status = false;
    this.isDanger = true;
    this.updateCar();
    this._appService.mail(mail).subscribe((yes) => {
      this._appService.caroff().subscribe((done) => {
        console.log(done);
      }, (err) => {
        console.log("Error :" + err)
      });
    }, (err) => {
      console.log("Error :" + err)
    })
  }

  mailEmergency() {
    let mail = {
      "sub": "Emergency",
      "body": `Your car ${this._appService.car['car_no']} is set on emergency at ${this.current_lat} and ${this.current_lng}`,
      "email": this._appService.car['danger_email']
    }
    this.status = true;
    this.isDanger = true;
    this.updateCar();

    this._appService.mail(mail).subscribe((yes) => {
      console.log("mail done");
    }, (err) => {
      console.log("Error :" + err)
    })
  }

  mailGefocening() {
    let mail = {
      "sub": "Emergency",
      "body": `Your car ${this._appService.car['car_no']} has voilated Geofencing at ${this.current_lat} and ${this.current_lng}`,
      "email": this._appService.car['danger_email']
    }

    this._appService.mail(mail).subscribe((yes) => {
      this.status = false;
      this.updateCar();
      this._appService.caroff().subscribe((done) => {
        console.log(done);
      }, (err) => {
        console.log("Error :" + err)
      });
    }, (err) => {
      console.log("Error :" + err)
    })
  }

  checkGeofencing() {
    let car = this._appService.car
    if (!car.car_status.gf)
      return;
    let currentDistance = this.calcCrow(car.car_status.gf_lat, car.car_status.gf_lon, this.current_lat, this.current_lng);
    if (currentDistance > parseInt(car.car_status.gf_lmit)) {
      this.mailGefocening()
    }
  }

  endJourney() {
    this.status = false;
    this.updateCar();
    this._appService.endCarJourney(this.history_id).subscribe(
      (res) => {
        console.log(res);
        this._appService.caroff().subscribe((done) => {
          console.log(done);
          this.router.navigate(['home']);
        }, (err) => {
          this.router.navigate(['home']);
          console.log("Error :" + err)
        });
      }, (err) => {
        console.log(err);
      }
    )
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInteval);
    clearInterval(this.globalTimer);
  }

  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
  calcCrow(lat1, lon1, lat2, lon2) {
    lat1 = parseFloat(lat1)
    lat2 = parseFloat(lat2)
    lon1 = parseFloat(lon1)
    lon2 = parseFloat(lon2)
    var R = 6371; // km
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1);
    lat1 = this.toRad(lat1);
    lat2 = this.toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000;
  }

  toRad(Value) {
    return Value * Math.PI / 180;
  }

}
