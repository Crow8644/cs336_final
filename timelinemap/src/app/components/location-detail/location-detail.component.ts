import { Component } from '@angular/core';
//import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-location-detail',
  imports: [MatExpansionModule],
  template: `
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          Location Name <!-- CONNECT SERVICE HERE --> 
        </mat-panel-title>
      </mat-expansion-panel-header>
      
        <p>start date - end date</p> <!-- CONNECT SERVICE HERE -->
        <p>description</p> <!-- CONNECT SERVICE HERE -->

    </mat-expansion-panel>
  `,
  styles: ``
})
export class LocationDetailComponent {

}
