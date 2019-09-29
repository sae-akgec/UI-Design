import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOMAIN } from './assets';

@Injectable()
export class AppService {
    domain: string;
    car: any;

    lat = 28.346678;
    lng = 77.534380;

    constructor(private http: HttpClient) {
        this.domain = DOMAIN
    }

    setDestination(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }

    getCarByNumber(id: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });
        return this.http.get<any>(this.domain + '/api/cars/number/' + id + '/', { headers: headers })
    }

    getCarById(car_id: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });
        return this.http.get<any>(this.domain + '/api/cars/' + car_id + '/', { headers: headers })
    }

    getCarHistories(): Observable<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });
        return this.http.get<any[]>(this.domain + '/api/history/car/' + this.car._id + '/', { headers: headers })
    }

    endCarJourney(id): Observable<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });
        return this.http.get<any[]>(this.domain + '/api/history/' + id + '/end/', { headers: headers })
    }

    updateCarStatus(body): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });
        return this.http.post(this.domain + '/api/cars/' + this.car._id + '/status/', body, { headers: headers })
    }

    addCarHistory(body): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });
        return this.http.post(this.domain + '/api/history/', body, { headers: headers })
    }

    shutdown(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });
        return this.http.get<any>("http://localhost:5000/api" + '/shutdown/', { headers: headers })
    }

    speed(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });
        return this.http.get<any>("http://localhost:5000/api" + '/speed/', { headers: headers })
    }
    caron(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });
        return this.http.get<any>("http://localhost:5000/api" + '/caron/', { headers: headers })
    }

    caroff(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });
        return this.http.get<any>("http://localhost:5000/api" + '/caroff/', { headers: headers })
    }

    gps(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });
        return this.http.get<any>("http://localhost:5000/api" + '/gps/', { headers: headers })
    }
    batterylevel(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });
        return this.http.get<any>("http://localhost:5000/api" + '/batterylevel/', { headers: headers })
    }
    mail(body: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });
        return this.http.post("http://localhost:5000/api" + '/mail/', body, { headers: headers })
    }


}