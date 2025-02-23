import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResidenceService } from 'src/app/core/services/residence.service';
import { Residence } from 'src/app/core/models/residence';  
import { HttpErrorResponse } from '@angular/common/http';  

@Component({
  selector: 'app-update-residence',
  templateUrl: './update-residence.component.html',
  styleUrls: ['./update-residence.component.css'],
})
export class UpdateResidenceComponent implements OnInit {
  residenceForm: FormGroup;
  id: number | undefined; 
  residence: Residence | undefined;  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private residenceService: ResidenceService
  ) {

    this.residenceForm = this.fb.group({
      id: [{ value: '', disabled: true }],  
      name: ['', Validators.required],
      address: ['', Validators.required],
      status: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;  
    if (this.id) {
      this.residenceService.getResidenceById(this.id).subscribe({
        next: (data: Residence) => {
          this.residence = data;
          this.residenceForm.patchValue(this.residence);  
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error retrieving residence:', err.message);  
        },
      });
    }
  }

  updateResidence(): void {
    if (this.residenceForm.valid && this.id) {
      const updatedResidence = { ...this.residenceForm.value };
      this.residenceService.updateResidence(this.id, updatedResidence).subscribe({
        next: () => {
          this.router.navigate(['/residences']);  
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error updating residence:', err.message);  
        },
      });
    }
  }
}
