import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { ICoordinate } from '../models/coordinate.model';
import { ISchoolData } from '../models/school-data.model';

@Injectable({ providedIn: 'root' })
export class SchoolService {
  private getSchoolSubject = new Subject<Array<ISchoolData>>();
  private getAddressSubject = new Subject<ICoordinate>();
  private getLoadingSubject = new Subject<boolean>();
  addressApiURL: string = `${environment.apiUrl}/School`;

  getSchoolObservable$ = this.getSchoolSubject.asObservable();
  getAddressObservable$ = this.getAddressSubject.asObservable();
  getLoadingObservable$ = this.getLoadingSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  getSchools(coordinate: ICoordinate) {
    this.getLoadingSubject.next(true);
    this.getAddressSubject.next(coordinate);
    
    this.getSchoolsList(coordinate).subscribe((result) => {
      this.getSchoolSubject.next(result);
      this.getLoadingSubject.next(false);
    });
  }

  getSchoolsList(coordinate: ICoordinate): Observable<Array<ISchoolData>> {
    return this.httpClient.post<Array<ISchoolData>>(
      this.addressApiURL + '/GetSchoolsList',
      { coordinate: coordinate }
    );
  }
}
