import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-zoom',
  imports: [MatButtonModule, MatIcon],
  template: `
    <button matMiniFab aria-label="Zoom Out">
      <mat-icon>remove</mat-icon>
    </button>
    <button matMiniFab aria-label="Zoom In">
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

}
