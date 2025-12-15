import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PinsService } from './services/pins.service';
import { AsyncPipe } from '@angular/common';
import { LocationDetailComponent } from './components/location-detail/location-detail.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PinComponent } from './components/pin/pin.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIcon } from '@angular/material/icon';
import { MapViewComponent } from './components/map-view/map-view.component';


@Component({
  selector: 'app-root',
  imports: [MapViewComponent, RouterOutlet, LocationDetailComponent, LocationListComponent, TimelineComponent, PinComponent, MatIcon],
  template: `
    <app-timeline></app-timeline>
    <!--<app-map-view></app-map-view>-->

    <router-outlet />
  `,
  styles: [`
  `],
})
export class AppComponent {
  service = inject(PinsService);
  title = 'timelinemap';
  constructor() {

  }
}
