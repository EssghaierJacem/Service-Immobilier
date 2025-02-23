import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Residence } from '../models/residence';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResidenceService {
  private residenceUrl = 'http://localhost:3000/residences';

  constructor(private http: HttpClient) {}

  getResidences(): Observable<Residence[]> {
    return this.http.get<Residence[]>(this.residenceUrl);
  }

  deleteResidence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.residenceUrl}/${id}`);
  }

  addResidence(residence: Residence): Observable<Residence> {
    return this.http.post<Residence>(this.residenceUrl, residence);
  }

  updateResidence(id: number, residence: Residence): Observable<Residence> {
    return this.http.put<Residence>(`${this.residenceUrl}/${id}`, residence);
  }

  getResidenceById(id: number): Observable<Residence> {
    return this.http.get<Residence>(`${this.residenceUrl}/${id}`);
  }

  getMaxResidenceId(): Observable<number> {
    return this.http.get<Residence[]>(this.residenceUrl).pipe(
      map((residences) => {
        if (residences.length === 0) {
          return 0; 
        }
        const maxId = Math.max(...residences.map((res) => res.id));
        return maxId;
      })
    );
  }
}
