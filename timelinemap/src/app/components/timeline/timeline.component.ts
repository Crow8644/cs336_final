import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { LocationListComponent } from '../location-list/location-list.component';

@Component({
  selector: 'app-timeline',
  imports: [MatToolbarModule, MatSliderModule, MatButtonModule, MatIconModule, LocationListComponent],
  template: `
  <mat-toolbar>

    <button matIconButton id = "showLocList" (click) = "showLocList()">
      <mat-icon>menu</mat-icon>
    </button>
    <h1 class = "title"> Map Maker </h1>

    <mat-slider discrete min = "0" max = "1000">  <!-- CONNECT TO SERVICE LATER (min and max) -->
      <input matSliderStartThumb>
      <input matSliderEndThumb>
    </mat-slider>
  </mat-toolbar>

  <app-location-list [hidden]="!locList"> </app-location-list> <!-- this way of toggling was suggested by chatGPT -->
  `,
  styles: `
    .title {
      margin: 10rem;
    }

    mat-slider {
      
    }
  `
})
export class TimelineComponent {
  locList = false;
  showLocList(): void{
    this.locList = !this.locList;
  }

}
