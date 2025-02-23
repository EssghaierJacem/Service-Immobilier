import { Component } from '@angular/core';
import { Residence } from 'src/app/core/models/residence';
import { CommonService } from 'src/app/core/services/common.service';
import { ResidenceService } from 'src/app/core/services/residence.service';


@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css']
})
export class ResidencesComponent {
  searchAddress: string = ''; 
  favorites: Residence[] = []; 
  showLocations: { [key: number]: boolean } = {};  
  showFavorites: boolean = false;

  constructor(
    private commonService: CommonService, 
    private residenceService: ResidenceService
  ) {}

  listResidences: Residence[] = [];


  // The previous static Data.

  // listResidences: Residence[] = [
  //   { id: 1, name: "El fel", address: "Borj Cedria", image: "../../assets/images/R1.jpeg", status: "Disponible" },
  //   { id: 2, name: "El yasmine", address: "Ezzahra", image: "../../assets/images/R2.jpg", status: "Disponible" },
  //   { id: 3, name: "El Arij", address: "Rades", image: "../../assets/images/R3.jpg", status: "Vendu" },
  //   { id: 4, name: "El Anber", address: "inconnu", image: "../../assets/images/R4.jpg", status: "En Construction" },
  //   { id: 5, name: "El Amen", address: "Ariana", image: "../../assets/images/R5.jpg", status: "Disponible" },
  //   { id: 6, name: "El Razi", address: "Mannouba", image: "../../assets/images/R6.jpg", status: "Vendu" },
  // ];

  get filteredResidences() {
    return this.listResidences.filter(residence =>
      residence.address.toLowerCase().includes(this.searchAddress.toLowerCase())
    );
  }

  ngOnInit(): void {
    this.residenceService.getResidences().subscribe((data) => {
      this.listResidences = data;
    });
  }

  toggleLocation(residence: Residence) {
    if (residence.address.toLowerCase() === 'inconnu') {
      alert(`L'adresse de ${residence.name} est inconnue.`);
    } else {
      this.showLocations[residence.id] = !this.showLocations[residence.id];
    }
  }

  toggleFavorite(residence: Residence) {
    if (this.isFavorite(residence)) {
      this.favorites = this.favorites.filter(fav => fav.id !== residence.id);
    } else {
      this.favorites.push(residence);
    }
  }

  isFavorite(residence: Residence): boolean {
    return this.favorites.some(fav => fav.id === residence.id);
  }

  toggleFavoritesView() {
    this.showFavorites = !this.showFavorites;
  }

  countSameAddresses(address: string): number {
    return this.commonService.getSameValueOf(this.listResidences, 'address', address);
  }

  deleteResidence(id: number): void {
    console.log('Attempting to delete residence with id:', id);  
    this.residenceService.deleteResidence(id).subscribe({
      next: () => {
        console.log('Residence deleted successfully');  
        this.listResidences = this.listResidences.filter((res) => res.id !== id);
      },
      error: (err) => {
        console.error('Error deleting residence:', err);  
      }
    });
  }
  
}