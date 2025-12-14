import { Component, inject } from '@angular/core';
import { PinsService } from '../../services/pins.service';
import { PinComponent } from '../pin/pin.component';

@Component({
  selector: 'app-map-view',
  imports: [PinComponent],
  template: `
    <div id="map-container">
      <img [src]="service.safe_map_url()" id="map-image" style="height: {{initialHeight}}px"/>

      @for (location of service.pins(); track $index){
        <span class="pin-container" style="left: {{translate_x(location.x)}}px; top: {{translate_y(location.y)}}px">
          <app-pin [data]="location" class="pin"></app-pin>
        </span>
      }
    </div>
  `,
  styles: `
    #map-image { 
      z-index: -1;
    }
    #map-container {
      overflow: scroll;
      bottom: 0;
      right: 0;
      margin: 0;
    }
    .pin-container {
      position: relative;
      height: 0;
      width: 10rem;
    }
  `
})
export class MapViewComponent {
  service = inject(PinsService);

  public initialHeight = window.innerHeight;

  constructor() {
  }

  // HACK: Because finding the dimentions of the image is hard, everything is scaled around the height.
  // This means, in the datbase y is a percentage and x is a pixel number

  translate_y(y: number) {
    const chunk = this.initialHeight / 100
    return (y * chunk - this.initialHeight);
  }

  translate_x(x: number) {
    return x;
  }
}
