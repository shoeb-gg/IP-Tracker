import { AfterViewInit, Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { MapApiService } from 'src/app/services/map-api.service';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-map-interface',
  templateUrl: './map-interface.component.html',
  styleUrls: ['./map-interface.component.scss'],
})
export class MapInterfaceComponent implements AfterViewInit, OnInit {
  private map: any;
  updateIpSub: Subscription;

  apiData: any;

  cachedData: any;

  lati = 42;
  longi = -71;

  icon = L.icon({
    iconUrl: '../../../assets/icon-location.svg',
  });

  constructor(private mapApiService: MapApiService) {
    this.updateIpSub = this.mapApiService.updateIpObs().subscribe((ip) => {
      const checkCache = localStorage.getItem(ip);

      if (checkCache !== null) {
        this.apiData = JSON.parse(checkCache);
        this.loadDataFromCache(ip);
      } else {
        this.getApiData(ip);
      }
    });
  }

  loadDataFromCache(ip: string) {
    console.log('Loading from cache!');
    this.updatemap(ip);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([this.lati, this.longi], 10);
    const tiles = L.tileLayer(
      'https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=SeEKUUeuLhY5uIK5cM0e',
      {
        attribution:
          '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
        crossOrigin: true,
      }
    ).addTo(this.map);

    const marker = L.marker([this.lati, this.longi], { icon: this.icon }).addTo(
      this.map
    );
  }

  getApiData(ip: string) {
    this.mapApiService.getIpData(ip).subscribe(async (res: any) => {
      console.log(res);

      localStorage[ip] = JSON.stringify(res);

      this.apiData = res;

      this.updatemap(ip);
    });
  }

  updatemap(ip: string) {
    this.lati = this.apiData.location.lat;
    this.longi = this.apiData.location.lng;

    this.map.setView([this.lati, this.longi], 10);
    const marker = L.marker([this.lati, this.longi], {
      icon: this.icon,
    }).addTo(this.map);

    let location =
      this.apiData.location.city +
      ', ' +
      this.apiData.location.region +
      ', ' +
      this.apiData.location.country +
      ', ' +
      this.apiData.location.postalCode;

    let timeZone = this.apiData.location.timezone;
    let isp = this.apiData.isp;

    this.mapApiService.setIpDetails(ip, location, timeZone, isp);
  }
}
