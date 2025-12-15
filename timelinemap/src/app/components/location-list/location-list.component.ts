import { Component, computed, inject, input, model, signal, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { LocationDetailComponent } from '../location-detail/location-detail.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { Pin, PinsService } from '../../services/pins.service';
import { MapViewComponent } from '../map-view/map-view.component';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-location-list',
  imports: [ MatSidenavModule, LocationDetailComponent, MatExpansionModule, MapViewComponent],
  template: `
    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="over">
            <!-- Example list for testing -->
        <mat-accordion>
          <!-- CONNECT SERVICE HERE for list of locations -->
          @for (location of service.pins(); track $index){
            <app-location-detail [data]="location" 
            [open]="openPanel() === location.id"
          ></app-location-detail>
          }
        </mat-accordion>
      </mat-sidenav>
      <mat-sidenav-content>
        <app-map-view [(openPin)]="openPanel" (onAddPin)="pinAdded($event)" [(sliderValue)]="this.sliderValue" id="map-view"></app-map-view>
      </mat-sidenav-content>
  
    </mat-sidenav-container>
  `,
  styles: `
  mat-sidenav-container {
    width: 100%;
    height: 100vh;
  }

      #map-image {
      position: relative;
      
    }
    #map-view {
      z-index: -1;
    }
  `
})
export class LocationListComponent {
  service = inject(PinsService)
     @ViewChild('sidenav') sidenav!: MatSidenav;
  openPanel = model(""); // Set to blank 1 so everything is closed by default
  sliderValue = model(0);

  editPanel = signal("");

  constructor() {
    this.openPanel.subscribe(() => this.sidenav.open());
  }

  pinAdded(id: string) {
    const panel = this.service.pins().findIndex((value: Pin) => value.id === id)
    this.openPanel.set(id);
    this.editPanel.set(id);
  }

  toggle() {
    this.sidenav.toggle();
    const test = computed(() => this.openPanel)
  }
}

// Good Stackoverflow Post: https://stackoverflow.com/questions/53992454/open-close-panel-by-id-material-accordion