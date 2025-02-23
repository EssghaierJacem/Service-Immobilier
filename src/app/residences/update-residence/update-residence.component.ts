import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResidenceService } from 'src/app/core/services/residence.service';
import { Residence } from 'src/app/core/models/residence';  // Import Residence model
import { HttpErrorResponse } from '@angular/common/http';  // Import HttpErrorResponse

@Component({
  selector: 'app-update-residence',
  templateUrl: './update-residence.component.html',
  styleUrls: ['./update-residence.component.css'],
})
export class UpdateResidenceComponent implements OnInit {
  residenceForm: FormGroup;
  id: number | undefined;  // Make id optional
  residence: Residence | undefined;  // Properly type the residence object

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private residenceService: ResidenceService
  ) {
    // Initialize the form
    this.residenceForm = this.fb.group({
      id: [{ value: '', disabled: true }],  // Disable the 'id' field
      name: ['', Validators.required],
      address: ['', Validators.required],
      status: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;  // Retrieve the id from the URL
    if (this.id) {
      this.residenceService.getResidenceById(this.id).subscribe({
        next: (data: Residence) => {
          this.residence = data;
          this.residenceForm.patchValue(this.residence);  // Pre-fill the form with existing data
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error retrieving residence:', err.message);  // Handle error
        },
      });
    }
  }

  // Method to update residence
  updateResidence(): void {
    if (this.residenceForm.valid && this.id) {
      const updatedResidence = { ...this.residenceForm.value };
      this.residenceService.updateResidence(this.id, updatedResidence).subscribe({
        next: () => {
          this.router.navigate(['/residences']);  // Redirect to residences page after update
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error updating residence:', err.message);  // Handle error
        },
      });
    }
  }
}
