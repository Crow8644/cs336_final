import { Component, inject, input, model, ViewContainerRef, ViewRef } from '@angular/core';
import { PinsService } from '../../services/pins.service';
import { Pin } from '../../services/pins.service'
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-pin',
  imports: [MatIcon],
  template: `
    <span id="container">
      <p class="name-display">{{data().name}}</p>
      <mat-icon class="material-symbols-outlined icon">{{data().icon}}</mat-icon>
      <br/>
      <mat-icon class="material-symbols-outlined pointer">keyboard_arrow_down</mat-icon>
    </span>
  `,
  styles: `
    .name-display {
      visibility: hidden;
      margin-left: 0.2rem;
      margin-bottom: 0.2rem;
      font-style: italic;
    }
    #container:hover .name-display {
      visibility: visible;
    }
    #container {
      display: inline;
      flex-direction: horizontal;
      align-content: center;
    }
  `
})
export class PinComponent {
  private viewContainer = inject(ViewContainerRef);
  
  public data = input.required<Pin>();
  scaleFactor = model(1); // Optionally takes a signal to scale fonts

  constructor() {
    
  }
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