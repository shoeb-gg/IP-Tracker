import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapApiService {
  private ipSub = new Subject<any>();
  private settingIp = new Subject<any>();
  settingIpObs$ = this.settingIp.asObservable();

  constructor(private http: HttpClient) {}

  updateIp(ip: string) {
    let newIp = ip;
    this.ipSub.next(newIp);
  }

  updateIpObs(): Observable<any> {
    return this.ipSub.asObservable();
  }

  setIpDetails(ip: string, location: string, timeZone: string, isp: string) {
    let obj = { ip, location, timeZone, isp };
    this.settingIp.next(obj);
  }

  getIpData(ip: string) {
    const header = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer WookieIP2022',
    });

    return this.http.get<{ data: any }>(
      'https://wookie.codesubmit.io/ipcheck?ip=' + ip,
      { headers: header }
    );
  }

  initialIp() {
    return this.http.get<{ data: any }>('https://api.ipify.org/?format=json');
  }
}
