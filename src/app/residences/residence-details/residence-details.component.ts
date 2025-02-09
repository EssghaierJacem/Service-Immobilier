import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResidenceService } from 'src/app/services/residence.service';

@Component({
  selector: 'app-residence-details',
  templateUrl: './residence-details.component.html',
  styleUrls: ['./residence-details.component.css']
})
export class ResidenceDetailsComponent implements OnInit {
  residenceId!: string;
  residence: any;
  nextResidenceId!: string;
  previousResidenceId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private residenceService: ResidenceService
  ) { }

  ngOnInit(): void {
    this.residenceId = this.route.snapshot.paramMap.get('id')!;
    this.updateResidenceDetails(this.residenceId);
  }

  updateResidenceDetails(residenceId: string): void {
    this.residence = this.residenceService.getResidenceById(parseInt(residenceId));

    if (this.residence) {
      const allResidences = this.residenceService['residencesSubject'].value;
      const currentIndex = allResidences.findIndex(res => res.id === this.residence.id);

      this.nextResidenceId = allResidences[currentIndex + 1]?.id?.toString() || allResidences[0].id.toString();
      this.previousResidenceId = allResidences[currentIndex - 1]?.id?.toString() || allResidences[allResidences.length - 1].id.toString();
    }
  }

  goToNextResidence(): void {
    this.router.navigate(['/residences', this.nextResidenceId]);
  }

  goToPreviousResidence(): void {
    this.router.navigate(['/residences', this.previousResidenceId]);
  }
}
