import { Component, inject } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LocationDetailComponent } from '../location-detail/location-detail.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { PinsService } from '../../services/pins.service';

@Component({
  selector: 'app-location-list',
  imports: [ MatSidenavModule, LocationDetailComponent, MatExpansionModule],
  template: `
    <mat-sidenav-container>
      <mat-sidenav></mat-sidenav>
      <mat-sidenav-content>
      <!-- Example list for testing -->
        <mat-accordion>
          <app-location-detail></app-location-detail>
          <app-location-detail></app-location-detail>
          <app-location-detail></app-location-detail>
        </mat-accordion>

        <!-- CONNECT SERVICE HERE for list of locations -->
        @for (loction of service.pins(); track $index){
          
        }
        
      </mat-sidenav-content>
  
    </mat-sidenav-container>
  `,
  styles: `
  mat-sidenav-container {
    width: 20%;
  }
  `
})
export class LocationListComponent {
  service = inject(PinsService);
}
