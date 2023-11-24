import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public form!: FormGroup;
  address: string = '';
  addressList: string[] = [];
  addressCoordinate: ICoordinate | undefined;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      address: [this.address, [Validators.required]],
    });

    this.form.controls['address'].valueChanges
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
            this.address = value;
            this.addressList = result;
          });
      });
  }

  searchSchools() {
    this.addressService
      .getAddressCoordinate(this.address)
      .subscribe((result) => {
        this.addressCoordinate = result;
      });
  }
}
