import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PinsService } from './services/pins.service';
import { AsyncPipe } from '@angular/common';
import { LocationDetailComponent } from './components/location-detail/location-detail.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LocationDetailComponent, LocationListComponent, TimelineComponent],
  template: `
    <app-timeline></app-timeline>
    <span id="map-container">
      <img [src]="service.safe_map_url()" id="map-image"/>
    </span>

    <router-outlet />
  `,
  styles: [`
    #map-image {
      position: relative;
      bottom: 0;
      right: 0;
    }
    #map-container {
      display: inline-block;
      overflow: scroll;
    }
  `],
})
export class AppComponent {
  service = inject(PinsService);  

  title = 'timelinemap';
  constructor() {

  }
}
