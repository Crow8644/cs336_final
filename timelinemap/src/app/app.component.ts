import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PinsService } from './services/pins.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>Welcome to {{title}}!</h1>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  service = inject(PinsService);

  title = 'timelinemap';
  constructor() {

    console.log(this.service.map_url$);

    
  }
}
