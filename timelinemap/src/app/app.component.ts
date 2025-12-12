import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  title = 'timelinemap';
}
