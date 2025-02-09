import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResidenceService {
  private residencesSubject = new BehaviorSubject<any[]>([
    { id: 1, name: "El fel", address: "Borj Cedria", image: "../../assets/images/R1.jpeg", status: "Disponible" },
    { id: 2, name: "El yasmine", address: "Ezzahra", image: "../../assets/images/R2.jpg", status: "Disponible" },
    { id: 3, name: "El Arij", address: "Rades", image: "../../assets/images/R3.jpg", status: "Vendu" },
    { id: 4, name: "El Anber", address: "inconnu", image: "../../assets/images/R4.jpg", status: "En Construction" },
    { id: 5, name: "El Amen", address: "Ariana", image: "../../assets/images/R5.jpg", status: "Disponible" },
    { id: 6, name: "El Razi", address: "Mannouba", image: "../../assets/images/R6.jpg", status: "Vendu" },
  ]);

  get residences$() {
    return this.residencesSubject.asObservable();
  }

  getResidenceById(id: number) {
    return this.residencesSubject.value.find(residence => residence.id === id);
  }
}
