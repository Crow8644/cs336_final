import { Component, input, inject, computed  } from '@angular/core';
//import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { PinsService, Pin } from '../../services/pins.service';
import { LocationEditingComponent } from '../location-editing/location-editing.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule, Validators, FormGroup, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {TextFieldModule} from '@angular/cdk/text-field';

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
//https://dev.to/this-is-angular/how-to-combine-add-and-edit-forms-in-angular-4888
@Component({
  selector: 'app-location-detail',
  imports: [MatExpansionModule, LocationEditingComponent, MatButtonModule, MatIconModule, ReactiveFormsModule, TextFieldModule],
  template: `
<!-- I orginally had the entire expansion pannel in the @if and @else, but that was causing issues, ChatGPT suggested only putting the form parts in @if and @else
<!-- The form for editing the location -->

  <mat-expansion-panel [expanded]="open()">
        <mat-expansion-panel-header>
          <mat-panel-title>
                {{data().name}}    
          </mat-panel-title>

        </mat-expansion-panel-header>
      
      <!-- So you can only edit if you aren't editing -->
      @if(!editing){
        <button matIconButton id = "edit" (click) = "edit()" type="button">
        <mat-icon>edit</mat-icon>
        </button>
      }
      @if(editing){
      <form [formGroup]="editingForm" (ngSubmit)="onSubmit()">
          <input type="text" formControlName="locationName" placeholder="Location Name"> <!-- CONNECT SERVICE HERE --> 
          <input type="text" formControlName="startDate" placeholder="Start Date"> <!-- CONNECT SERVICE HERE --> 
          <input type="text" formControlName="endDate" placeholder="End Date"> <!-- CONNECT SERVICE HERE --> 

          <!-- Change to textarea to allow box to show all of the description -->
          <textarea MatInput 
          formControlName="description"  
          ngDefaultControl 
          cdkTextareaAutosize
          #autosize="cdkTextareaAutosize"
          cdkAutosizeMinRows="2"
          cdkAutosizeMaxRows="7"
          > 
          </textarea>
          <!-- CONNECT SERVICE HERE --> 

          <button type="submit">Save</button>
      </form>
      }

      @else{ 
        <p>{{data().startTime}} - {{data().endTime}}</p> <!-- CONNECT SERVICE HERE -->
        <p>{{data().description}}</p> <!-- CONNECT SERVICE HERE -->
        }
    </mat-expansion-panel>
    
  `,
  styles: ``
})
export class LocationDetailComponent {
  service = inject(PinsService);
  open = input(false);

  constructor() {
    
  }

  editing: boolean = false;
  submitted: boolean = false;
  public data = input.required<Pin>();
  editingForm = new FormGroup(
    {
      locationName: new FormControl(''), //'', Validators.required
      startDate: new FormControl(),
      endDate: new FormControl(),
      description: new FormControl(''),
    },

    //{ validators: this.createContactMethodValidator() }
  );

  ngOnInit(){

  }
  
  edit(): void{
    this.editing = !this.editing;
    if (this.editing) {
      this.editingForm.patchValue({
        locationName: this.data().name,
        startDate: this.data().startTime,
        endDate: this.data().endTime,
        description: this.data().description,
        
      });
  }

  }

    onSubmit() {
    this.submitted = true;
    this.editing = false;
    // I did a bad thing and added "!" to bypass undefined posibility, if time will fix
    this.service.updatePin({name: this.editingForm.value.locationName!, startTime: this.editingForm.value.startDate, endTime: this.editingForm.value.endDate, description: this.editingForm.value.description!, id: this.data().id})
  }
}
