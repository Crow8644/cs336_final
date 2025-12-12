import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PinsService } from './services/pins.service';
import { AsyncPipe } from '@angular/common';
import { LocationDetailComponent } from './components/location-detail/location-detail.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { TimelineComponent } from './components/timeline/timeline.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LocationDetailComponent, LocationListComponent, TimelineComponent],
  template: `
    <app-timeline></app-timeline>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  service = inject(PinsService);

  title = 'timelinemap';
  constructor() {

    console.log(this.service.map_url$);

    
  }
}
