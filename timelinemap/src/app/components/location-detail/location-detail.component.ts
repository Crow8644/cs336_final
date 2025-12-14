import { Component, input } from '@angular/core';
//import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { Pin } from '../../services/pins.service';
import { LocationEditingComponent } from '../location-editing/location-editing.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule, Validators, FormGroup, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/*TODO:
-Connect service
-Add service data as default/placeholder in the inputs-
-Add styling
*/

interface editForm {
  locationName: string;       // required
  minDate: string;        // required
  maxDate: string;            // required
  description: string;          // required

}
@Component({
  selector: 'app-location-detail',
  imports: [MatExpansionModule, LocationEditingComponent, MatButtonModule, MatIconModule, ReactiveFormsModule],
  template: `
<!-- I orginally had the entire expansion pannel in the @if and @else, but that was causing issues, ChatGPT suggested only putting the form parts in @if and @else
<!-- The form for editing the location -->

  <mat-expansion-panel [expanded]="true">
        <mat-expansion-panel-header>
          <mat-panel-title>
              @if(editing){
                <input type="text" formControlName="locationName" placeholder="Location Name" [formControl]="editingForm.controls.locationName"> <!-- CONNECT SERVICE HERE --> 
              }

              @else{
                {{data().name}}
                }
          </mat-panel-title>

        </mat-expansion-panel-header>
        <button matIconButton id = "edit" (click) = "edit()" type="button">
        <mat-icon>edit</mat-icon>
        </button>
      @if(editing){
      <form [formGroup]="editingForm" (ngSubmit)="onSubmit()">
          <input type="text" formControlName="minDate" placeholder="Start Date"> <!-- CONNECT SERVICE HERE --> 
          <input type="text" formControlName="maxDate" placeholder="End Date"> <!-- CONNECT SERVICE HERE --> 
          <input type="text" formControlName="description" placeholder="Description"> <!-- CONNECT SERVICE HERE --> 
      </form>
      }

      @else{ 
        <p>start date - end date</p> <!-- CONNECT SERVICE HERE -->
        <p>{{data().description}}</p> <!-- CONNECT SERVICE HERE -->
        }
    </mat-expansion-panel>
    
  `,
  styles: ``
})
export class LocationDetailComponent {
  editing: boolean = false;
  submitted: boolean = false;
  public data = input.required<Pin>();
  editingForm = new FormGroup(
    {
      locationName: new FormControl(), //'', Validators.required
      minDate: new FormControl(false),
      maxDate: new FormControl(false),
      description: new FormControl(false),
    },
    //{ validators: this.createContactMethodValidator() }
  );

  edit(): void{
    this.editing = !this.editing;

  }

    onSubmit() {
    this.submitted = true;
  }
}
