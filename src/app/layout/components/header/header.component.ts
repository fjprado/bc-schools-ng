import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';
import { ICoordinate } from 'src/app/models/coordinate.model';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  addressControl = new FormControl();
  listaAddress: string[] = [];
  addressCoordinate: ICoordinate | undefined;

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.addressControl.valueChanges
      .pipe(
        map((value) => value.trim()),
        filter((value) => value.length > 4),
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe(async (value) => {
        this.addressService
          .getSuggestedAddressList(value)
          .subscribe((result) => {
            this.listaAddress = result;
          });
      });
  }

  searchAddress() {
    this.addressService
      .getAddressCoordinate(this.addressControl.value)
      .subscribe((result) => {
        this.addressCoordinate = result;
      });
  }
}
