import { Component, inject, model, output, signal, Input } from '@angular/core';
import { PinsService } from '../../services/pins.service';
import { PinComponent } from '../pin/pin.component';
import { ZoomComponent } from '../zoom/zoom.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-map-view',
  imports: [PinComponent, ZoomComponent, MatButtonModule],
  template: `
    <div id="map-container">
      <img [src]="service.safe_map_url()" id="map-image" 
        style="height: {{initialHeight * zoomFactor()}}px; cursor: {{creating ? 'crosshair' : 'auto'}}" 
        (click)="makePin($event)"
      />

      <!-- These pins are positioned relative to their original position under the map -->
      @for (location of filteredPins(); track $index){
        <div class="pin-container" style="left: {{translate_x(location.x)}}rem; top: {{translate_y(location.y)}}rem">
          <app-pin [data]="location" class="pin" [(scaleFactor)]="zoomFactor" (openned)="openUp($index)"></app-pin>
        </div>
      }
      <span id="zoom-containter">
        <app-zoom [(scaleFactor)]="zoomFactor"></app-zoom>
      </span>

      <button mat-button id="make-pin-button" 
        style="background: {{creating ? 'aqua' : 'white'}}" 
        (click)="toggleCheck()">
        Create Location
      </button>
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
      position: absolute;
      width: 10rem;
      z-index: 0;
    }
    #zoom-containter {
      position: fixed;
      bottom: 0;
      right: 0;
    }
    #make-pin-button {
      position: fixed;
      bottom: 3.5rem;
      margin: 1rem;
      right: 0;
    }
  `
})
export class MapViewComponent {
  service = inject(PinsService);
  openPin = model(-1);
  onAddPin = output<string>();

  //For recieving the sliderFilter value, chatGPT suggested making the sliderValue a signal
  @Input() sliderValue = signal(0);

  public initialHeight = window.innerHeight;
  public zoomFactor = signal(1); // Making zoom factor a signal and passing it to the zoom component as a model lets the zoom component change it.

  public creating: boolean = false;

  constructor() {

  }

  //filter based off assignment 14
  filteredPins = computed(() =>
    this.service.pins().filter(pin =>
      pin.startTime! <= this.sliderValue() && pin.endTime! >= this.sliderValue()
    )
  );
  public openUp(index: number) {
    if (this.openPin() === index) this.openPin.set(-1); // This setting makes it so we can open the same pin multiple names in a row
    this.openPin.set(index);
  }

  toggleCheck() {
    this.creating = !this.creating;
  }

  makePin(event: MouseEvent) {
    if (this.creating) {
      // Documentation for this: https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
      // Post where I found out about it: https://stackoverflow.com/questions/36532307/rem-px-in-javascript
      const px_per_rem = parseFloat(getComputedStyle(document.documentElement).fontSize)

      const x = ((event.pageX / px_per_rem) * 10) / (this.zoomFactor() * this.initialHeight);
      const y = ((event.pageY / px_per_rem) * 10) / (this.zoomFactor() * this.initialHeight);

      // TODO: Let the user set the data
      this.service.addPin({
        x,
        y,
        name: "testAddPin",
      }).then((ref) => this.onAddPin.emit(ref.id));

      this.creating = false;
    }
  }

  // HACK: Because finding the dimentions of the image is hard, everything is scaled around the height.
  // This means, in the datbase y is a percentage and x is a pixel number

  // Trnaslate what's in  the databae to what should be onscreen:
  translate_y(y: number) {
    return ((y / 10) - 0.006) * this.zoomFactor() * this.initialHeight;
  }

  translate_x(x: number) {
    return (((x / 10) - 0.00005) * this.zoomFactor() * this.initialHeight) - 0.8;
  }
  
}
