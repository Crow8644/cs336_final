import { Component, input } from '@angular/core';
import { PinsService } from '../../services/pins.service';
import { Pin } from '../../services/pins.service'


@Component({
  selector: 'app-pin',
  imports: [],
  template: `
    <div id="container">
      <p>{{data.name}}</p>
      <mat-icon class="material-symbols-outlined icon">Flag</mat-icon>
      <mat-icon class="material-symbols-outlined pointer">Keyboard Arrow Down</mat-icon>
    </div>
  `,
  styles: `
    #container {
      display: relative;
      
    }
  `
})
export class PinComponent {
  public data = input.required<Pin>();
}

/* Icons from Material Desing that work for this:

Location On
Home
Bolt
Dataset
View Cozy
Arrows Input
Key Vertical
Groups
Eco
Diamond
Landslide
Volcano
Mountain Flag
Family Group
Deceased
Home Health
Lab Panel
Playground
Playground 2
Anchor
Flag
Factory
Warehouse
Stadium
Castle
Fort
Things To Do

*/