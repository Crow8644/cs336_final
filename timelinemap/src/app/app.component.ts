import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PinsService } from './services/pins.service';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MapViewComponent } from './components/map-view/map-view.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TimelineComponent],
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
