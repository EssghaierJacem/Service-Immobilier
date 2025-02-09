import { Component, OnInit } from '@angular/core';
import { Apartment } from 'src/app/core/models/apartment';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent implements OnInit {
  apartments: Apartment[] = []; 

  constructor() { }

  ngOnInit(): void {
    this.apartments = [
      { apartNum: 101, floorNum: 1, surface: 50, terrace: true, surfaceterrace: 20, category: 'Luxury', ResidenceId: 1 },
      { apartNum: 102, floorNum: 1, surface: 55, terrace: false, surfaceterrace: 0, category: 'Standard', ResidenceId: 1 }
    ];
  }
}
