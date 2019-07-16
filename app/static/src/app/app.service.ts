import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOMAIN } from './assets';

@Injectable()
export class AppService {
    domain: string

    constructor(private http: HttpClient) {
        this.domain = DOMAIN
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

    shutdown(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });
        return this.http.get<any>("http://localhost:5000" + '/shutdown/', { headers: headers })
    }

    // getEvents(): Observable<any[]> {
    //     const headers = new HttpHeaders({
    //         'Content-Type': 'application/json; charset=utf-8'
    //     });
    //     return this.http.get<any[]>(this.domain + '/api/events/', { headers: headers })
    // }

    // regsiter(body: any): Observable<any> {
    //     const headers = new HttpHeaders({
    //         'Content-Type': 'application/json; charset=utf-8'
    //     });
    //     return this.http.post(this.domain + '/api/registrations/', body, { headers: headers })
    // }
}