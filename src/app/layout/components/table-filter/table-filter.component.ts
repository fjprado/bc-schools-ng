import { Component, Input, ViewEncapsulation } from '@angular/core';
import { IDropdownItem } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['table-filter.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TableFilterComponent {
  @Input() cities!: IDropdownItem[];
  @Input() schoolTypes!: IDropdownItem[];
  @Input() schoolCategories!: IDropdownItem[];
  @Input() range!: number;
  mapView: boolean = false;

  setMapView(): void {
    console.log(this.mapView);
    this.mapView = !this.mapView;
  }
}
