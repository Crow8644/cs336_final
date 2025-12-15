import { Component, inject, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { LocationDetailComponent } from '../location-detail/location-detail.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { PinsService } from '../../services/pins.service';
import { MapViewComponent } from '../map-view/map-view.component';

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
            <app-location-detail [data]="location"></app-location-detail>
          }
        </mat-accordion>
      </mat-sidenav>
      <mat-sidenav-content>
        <app-map-view></app-map-view>
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
    #map-container {
      display: inline-block;
      overflow: scroll;
      position: absolute;
      width: 100%;
      bottom: 0;
      right: 0;
      z-index: -1;
    }
  `
})
export class LocationListComponent {
  service = inject(PinsService);
   @ViewChild('sidenav') sidenav!: MatSidenav;

  toggle() {
    this.sidenav.toggle();
  }
}
