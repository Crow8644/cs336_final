import { Component, model } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-zoom',
  imports: [MatButtonModule, MatIcon],
  template: `
    <button mat-mini-fab aria-label="Zoom Out" (click)="zoomOut()">
      <mat-icon>remove</mat-icon>
    </button>
    <button mat-mini-fab aria-label="Zoom In" (click)="zoomIn()">
      <mat-icon>add</mat-icon>
    </button>
  `,
  styles: `
    button {
      margin: 1rem;
    }
  `
})
export class ZoomComponent {
  // Stretch goal, make this component respond to keybinds as well as clicking the buttons

  scaleFactor = model(1);

  zoomIn() {
    this.scaleFactor.set(this.scaleFactor() * 1.25);
  }
  zoomOut() {
    this.scaleFactor.set(this.scaleFactor() / 1.25);
  }
}
