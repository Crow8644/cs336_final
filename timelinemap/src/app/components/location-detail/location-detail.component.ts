import { Component, input } from '@angular/core';
//import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { Pin } from '../../services/pins.service';

@Component({
  selector: 'app-location-detail',
  imports: [MatExpansionModule],
  template: `
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          {{data().name}}
        </mat-panel-title>
      </mat-expansion-panel-header>
      
        <p>start date - end date</p> <!-- CONNECT SERVICE HERE -->
        <p>{{data().description}}</p> <!-- CONNECT SERVICE HERE -->

    </mat-expansion-panel>
  `,
  styles: ``
})
export class LocationDetailComponent {
  public data = input.required<Pin>();
}
