import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDropdownItem } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['table-filter.component.css'],
})
export class TableFilterComponent {
  @Input() cities!: IDropdownItem[];
  @Input() schoolTypes!: IDropdownItem[];
  @Input() schoolCategories!: IDropdownItem[];
  @Input() range!: number;
  @Input() isMobile!: boolean;
  mapView: boolean = false;
  @Output() onChangeView: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFilterSchools: EventEmitter<any> = new EventEmitter<any>();

  setMapView(): void {
    this.mapView = !this.mapView;
    this.onChangeView.emit();
  }

  filterSchools() {
    this.onFilterSchools.emit(this.range);
  }

  resetFilters() {
    this.cities.forEach((x) => (x.selected = false));
    this.schoolTypes.forEach((x) => (x.selected = false));
    this.schoolCategories.forEach((x) => (x.selected = false));
    this.range = 60;
    this.onFilterSchools.emit(this.range);
  }
}
