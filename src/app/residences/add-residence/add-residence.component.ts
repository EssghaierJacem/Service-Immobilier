import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ResidenceService } from 'src/app/core/services/residence.service';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent {
  residenceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private residenceService: ResidenceService,
    private router: Router
  ) {
    this.residenceForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      image: ['', [Validators.required, Validators.pattern('https?://.+')]],
      status: ['Disponible'],
      apartments: this.fb.array([]) 
    });
  }

  get apartments(): FormArray {
    return this.residenceForm.get('apartments') as FormArray;
  }

  addApartment() {
    this.apartments.push(this.fb.group({
      residenceId: ['', Validators.required],
      apartmentNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      floorNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      terrace: [false],
      surfaceTerrace: [{ value: '', disabled: true }, Validators.pattern('^[0-9]+$')]
    }));
  }

  removeApartment(index: number) {
    this.apartments.removeAt(index);
  }

  addResidence(): void {
    if (this.residenceForm.valid) {
      this.residenceService.getMaxResidenceId().subscribe((maxId) => {
        const newResidenceId = maxId + 1; 
        this.residenceForm.patchValue({ id: newResidenceId }); 

        this.residenceService.addResidence(this.residenceForm.value).subscribe(() => {
          alert('Résidence ajoutée avec succès !');
          this.router.navigate(['/residences']);
        });
      });
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }
}
