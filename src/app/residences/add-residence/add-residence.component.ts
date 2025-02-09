import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  saveResidence(): void {
    this.router.navigate(['/residences']);
  }
}
