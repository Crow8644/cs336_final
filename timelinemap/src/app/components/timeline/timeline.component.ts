import { Component, ViewChild, signal } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { LocationListComponent } from '../location-list/location-list.component';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [MatToolbarModule, MatSliderModule, MatButtonModule, MatIconModule, LocationListComponent],
  template: `
  <mat-toolbar class="header">

    <button matIconButton id = "showLocList" (click)="locationList.toggle()">
      <mat-icon>menu</mat-icon>
    </button>
    <h1 class = "title"> Map Maker </h1>

    <mat-slider discrete min = "0" max = "1000" (input) = "sliderChanged($event)">  <!-- CONNECT TO SERVICE LATER (min and max) --> <!--[(ngModel)] = 'sliderFilter'-->
      <input matSliderThumb> <!-- Style so slider is just a point instead of a line -->
    </mat-slider>
  </mat-toolbar>

  <app-location-list [(openPanel)]="openPin" [sliderValue]="this.sliderValue" #locationList> </app-location-list> <!-- this way of toggling was suggested by chatGPT -->
  `,
  styles: `
    .title {
      margin: 10rem;
    }

    mat-slider {

    }

    .header {
      position: sticky;
      top: 0;
      z-index: 1;
    }
  `
})
export class TimelineComponent {
  public openPin = signal(-1); // Set to negative 1 so everything is closed by default
  @ViewChild('locationList') locationList!: LocationListComponent;
  sliderValue = signal(0);

  sliderChanged(event: Event){
    const newValue = (event.target as HTMLInputElement).valueAsNumber;
    this.sliderValue.set(newValue); // updates the signal
  }

}