import { Component, inject, signal } from '@angular/core';
import { PinsService } from '../../services/pins.service';
import { PinComponent } from '../pin/pin.component';
import { ZoomComponent } from '../zoom/zoom.component';

@Component({
  selector: 'app-map-view',
  imports: [PinComponent, ZoomComponent],
  template: `
    <div id="map-container">
      <img [src]="service.safe_map_url()" id="map-image" style="height: {{initialHeight * zoomFactor()}}px" (click)="makePin($event)"/>

      <!-- These pins are positioned relative to their original position under the map -->
      @for (location of service.pins(); track $index){
        <span class="pin-container" style="left: {{translate_x(location.x)}}px; top: {{translate_y(location.y)}}px">
          <app-pin [data]="location" class="pin"></app-pin>
        </span>
      }
      <span id="zoom-containter">
        <app-zoom [(scaleFactor)]="zoomFactor"></app-zoom>
      </span>
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
    #zoom-containter {
      position: fixed;
      bottom: 0;
      right: 0;
    }
  `
})
export class MapViewComponent {
  service = inject(PinsService);

  public initialHeight = window.innerHeight;
  public zoomFactor = signal(1); // Making zoom factor a signal and passing it to the zoom component as a model lets the zoom component change it.

  constructor() {
  }

  makePin(event: MouseEvent) {
    // Unfinished: used to make a pin
    // TODO: turn this off when user's haven't selected a 'make pin' button
    const x = event.offsetX;
    const y = (event.offsetY / (this.initialHeight * this.zoomFactor())) * 100
  }

  // HACK: Because finding the dimentions of the image is hard, everything is scaled around the height.
  // This means, in the datbase y is a percentage and x is a pixel number

  // Trnaslate what's in  the databae to what should be onscreen:
  translate_y(y: number) {
    // y needs to be converted to pixels
    const chunk = this.initialHeight / 100
    const position = (y * chunk - this.initialHeight) * this.zoomFactor();

    // The subtration at the end attempts to adjust it so the point of the arrow is at the calculated point,
    // Not the top left corner of the div. These number's aren't perfect yet
    return position - 64;
  }

  translate_x(x: number) {
    const position = x * this.zoomFactor();

    // The subtration at the end attempts to adjust it so the point of the arrow is at the calculated point,
    // Not the top left corner of the div. These number's aren't perfect yet
    return position - 12;
  }
}
