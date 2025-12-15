import { Component, signal, ViewChild } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { LocationListComponent } from '../location-list/location-list.component';

@Component({
  selector: 'app-timeline',
  imports: [MatToolbarModule, MatSliderModule, MatButtonModule, MatIconModule, LocationListComponent],
  template: `
  <mat-toolbar class="header">

    <button matIconButton id = "showLocList" (click)="locationList.toggle()">
      <mat-icon>menu</mat-icon>
    </button>
    <h1 class = "title"> Map Maker </h1>

    <mat-slider discrete min = "0" max = "1000">  <!-- CONNECT TO SERVICE LATER (min and max) -->
      <input matSliderThumb> <!-- Style so slider is just a point instead of a line -->
    </mat-slider>
  </mat-toolbar>

  <app-location-list [(openPanel)]="openPin" #locationList> </app-location-list> <!-- this way of toggling was suggested by chatGPT -->
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


}
