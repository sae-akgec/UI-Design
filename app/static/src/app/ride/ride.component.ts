import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit, AfterViewInit {

  public start_lat = 28.348678;
  public start_lng = 77.537380;

  public current_lat = 28.348678;
  public current_lng = 77.537380;


  public origin: any;
  public destination: any;

  public carSpeed = 0;

  public flameImage="/assets/flameok.png"

  constructor(private _appService:AppService) { }

  ngOnInit() {
    this.getDirection();
    this._appService.caron().subscribe((done)=>{
      console.log(done);
    }, (err)=>{
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
      (history) =>{
        console.log(history);
      }, (err)=>{
        console.log(err);
      }
    )
  }

  ngAfterViewInit(): void {

    setInterval(()=>{
      this.flameSensor();
      this._appService.gps().subscribe((data) =>{
        this.current_lat = data['lat'];
        this.current_lng = data['lng'];
      }, (err)=>{
        console.log(err);
      });
    }, 1000);
  }

  getDirection() {
    this.origin = { lat: this.start_lat, lng: this.start_lng };
    this.destination = { lat: this._appService.lat, lng: this._appService.lng};
  }

  flameSensor():void{
    this._appService.flame().subscribe(
      (data)=>{
        if(data['status'] === true){
          this.flameImage = "/assets/flame.jpeg";
          this.mailDanger("Fire");
        } else{
          this.flameImage="/assets/flameok.png";
        }
      }, (err) =>{
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

    this._appService.mail(mail).subscribe((yes)=>{
      this._appService.caroff().subscribe((done)=>{
        console.log(done);
      }, (err)=>{
        console.log("Error :" + err)
      })
    }, (err)=>{
      console.log("Error :" + err)
    })
  }

  mailEmergency() {
    let mail = {
      "sub": "Emergency",
      "body": `Your car ${this._appService.car['car_no']} is set on emergency at ${this.current_lat} and ${this.current_lng}`,
      "email": this._appService.car['danger_email']
    }

    this._appService.mail(mail).subscribe((yes)=>{
      console.log("mail done");
    }, (err)=>{
      console.log("Error :" + err)
    })
  }

}
