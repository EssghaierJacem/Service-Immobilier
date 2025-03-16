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
  ) 

  // or we can inject through this 
  // private residenceService = inject(ResidenceService);

  // ken aatak chnoua el fark bin Inject wel appel fl constructeur " 
  // a9al charge aal constructeur, w facile a lire"
  
  {
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

  //Exemple  fel Ts
  /*
    addEmployeeForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]), // [10]
    surname: new FormControl('', [Validators.required]) // [11]
    });
  */

    //Implementation fel HTML 

  /*
    <form [formGroup]="addEmployeeForm">
      <label>name</label>
      <input type="text" formControlName="name">
      <div *ngIf="Name.invalid && Name.touched"> <!-- [12] -->
        Le nom contient au moins trois caractères
      </div>

      <label>surname</label>
      <input type="text" formControlName="surname">
      <div *ngIf="Surname.invalid && Surname.touched"> <!-- [13] -->
        Le prénom est obligatoire
      </div>

      <input type="submit" value="add Employer" (click)="save()" [disabled]="addEmployeeForm.invalid"> <!-- [14] -->
    </form>
  */

  //Implementation du Service 

  /*
  employee!: Employee;

  constructor(private s: CompanyService, private act: ActivatedRoute) {} // [15]

  save() {
    if (this.addEmployeeForm.valid) { // [16]
      this.employee = this.addEmployeeForm.value; // [17]
      let idCompany = this.act.snapshot.params['id']; // [18]

      this.s.findCompanyById(idCompany).subscribe(
        (result) => {
          this.employee.company = result;
          this.s.addEmployee(this.employee).subscribe( // [19] Appel au backend pour ajouter
            (res) => {
              console.log('Employé ajouté avec succès');
            },
            (err) => {
              console.log('Erreur lors de l\'ajout');
            }
          );
        }
      );
    } else {
      console.log('formulaire invalide');
    }
  }
    */

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
