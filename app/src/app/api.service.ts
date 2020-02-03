import { Injectable } from '@angular/core';
import { Area } from './models';
import { AREAS } from './mock-areas';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getAreas(): Observable<Area[]> {
    return of(AREAS);
  }
}
