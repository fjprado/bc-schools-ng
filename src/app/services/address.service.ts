import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ICoordinate } from '../models/coordinate.model';

@Injectable({ providedIn: 'root' })
export class AddressService {
  addressApiURL: string = `${environment.apiUrl}/Address`;
  constructor(private httpClient: HttpClient) {}

  getSuggestedAddressList(typedAddress: string): Observable<Array<string>> {
    return this.httpClient.post<Array<string>>(
      this.addressApiURL + '/GetSuggestedAddressList',
      { address: typedAddress }
    );
  }

  getAddressCoordinate(typedAddress: string): Observable<ICoordinate> {
    return this.httpClient.post<ICoordinate>(
      this.addressApiURL + '/GetAddressCoordinate',
      { address: typedAddress }
    );
  }
}
