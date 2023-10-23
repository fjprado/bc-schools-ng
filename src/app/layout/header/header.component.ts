import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  address = new FormControl(1000);

  constructor() {}

  searchAddress(value: any) {
    this.address = value;
    console.log(this.address);
  }
}
