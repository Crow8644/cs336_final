import { Component, ViewChild, computed, inject, signal } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { LocationListComponent } from '../location-list/location-list.component';
import { PinsService } from '../../services/pins.service';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [MatToolbarModule, MatSliderModule, MatButtonModule, MatIconModule, LocationListComponent],
  template: `
  <mat-toolbar class="header">

    <button matIconButton id = "showLocList" (click)="locationList.toggle()" mat-mini-fab>
      <mat-icon>menu</mat-icon>
    </button>
    <h1 class = "title"> Map Maker </h1>

    <mat-slider class="custom-slider"  min = "0" max = "{{maxVal()}}" (input) = "sliderChanged($event)">
      <input matSliderThumb> <!-- Style so slider is just a point instead of a line -->
    </mat-slider>
    <div class="slider-value">{{ sliderValue() }}</div>
  </mat-toolbar>

  <app-location-list [(openPanel)]="openPin" [(sliderValue)]="this.sliderValue" #locationList> </app-location-list> <!-- this way of toggling was suggested by chatGPT -->
  `,
  styles: `
    .title {
      margin: 3rem;
      color: rgb(220, 225, 233);
    }

    mat-toolbar {
      background-color: rgb(33, 36, 40);
    }

    .header {
      position: sticky;
      top: 0;
      z-index: 1;
    }

    /* I found how to style the slider from here: https://stackoverflow.com/questions/75609221/styling-the-angular-material-15-slider  
      and here: https://stackoverflow.com/questions/45389498/change-default-background-color-of-md-slider-of-angular-material*/
    .custom-slider {
      --mdc-slider-handle-color: white;
      --mdc-slider-focus-handle-color: white;
      --mdc-slider-active-track-color: white;
      --mdc-slider-inactive-track-color: white;
      width: 55%;
    }

    /* Displaying the value outside the value label was suggested by chatGPT, I was nearly going to give up and use this: height: 25%; (which makes things weird and super janky)*/
    .slider-value {
      color: white;
    }

  `
})
export class TimelineComponent {
  public openPin = signal(""); // Set to negative 1 so everything is closed by default
  @ViewChild('locationList') locationList!: LocationListComponent;
  sliderValue = signal(0);

  service = inject(PinsService);

  public maxVal = computed(() => 
    this.service.pins().map(entry => {
      if (entry.endTime === Number.MAX_VALUE) {
        return 0;
      }
      else {
        return entry.endTime ?? 0;
      }
    }).reduce((prev, current) => ((prev ?? 0) > (current ?? 0)) ? prev : current, 0)
  );

  constructor() {

  }

  sliderChanged(event: Event){
    const newValue = (event.target as HTMLInputElement).valueAsNumber;
    this.sliderValue.set(newValue); // updates the signal
  }

}