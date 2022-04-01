import { Component, OnInit } from '@angular/core';
import { MapApiService } from 'src/app/services/map-api.service';

@Component({
  selector: 'app-search-nav',
  templateUrl: './search-nav.component.html',
  styleUrls: ['./search-nav.component.scss'],
})
export class SearchNavComponent implements OnInit {
  ipAddress: string = '...';
  location: string = '...';
  timezone: string = '...';
  isp: string = '...';

  constructor(private mapApiService: MapApiService) {}

  ngOnInit(): void {
    this.mapApiService.settingIpObs$.subscribe((obj) => {
      this.ipAddress = obj.ip;
      this.location = obj.location;
      this.timezone = obj.timeZone;
      this.isp = obj.isp;
    });

    this.mapApiService.initialIp().subscribe((res: any) => {
      this.getIpDetails(res.ip);
    });
  }

  getIpDetails(ipInput: string) {
    this.mapApiService.updateIp(ipInput);
  }
}
