import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent {
  apartForm: FormGroup;
  newApart: any; 

  constructor(private fb: FormBuilder) {
    this.apartForm = this.fb.group({
      residenceId: ['', Validators.required],
      apartmentNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      floorNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      terrace: [false],
      surfaceTerrace: [{ value: '', disabled: true }, Validators.pattern('^[0-9]+$')]
    });

    this.apartForm.get('terrace')?.valueChanges.subscribe(value => {
      if (value) {
        this.apartForm.get('surfaceTerrace')?.enable();
      } else {
        this.apartForm.get('surfaceTerrace')?.disable();
      }
    });
  }

  addApartment() {
    if (this.apartForm.valid) {
      this.newApart = this.apartForm.value;
      console.log('Nouvel appartement ajouté :', this.newApart);
    }
  }
}