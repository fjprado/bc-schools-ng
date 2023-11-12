import { Component, OnInit, Input } from '@angular/core';
import { IDropdownItem } from '../dropdown/dropdown.component';
import { ISchoolData } from 'src/app/models/school-data.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table-content',
  templateUrl: 'table-content.component.html',
  styleUrls: ['table-content.component.css'],
})
export class TableContentComponent implements OnInit {
  @Input() dataSource: ISchoolData[] = [];
  items: IDropdownItem[] = [];
  cityList: IDropdownItem[] = [];
  schoolTypeList: IDropdownItem[] = [];
  schoolCategoryList: IDropdownItem[] = [];
  range: number = 1;
  mapView: boolean = true;
  itemsPerPage: number = 3; // Number of items to display per page
  currentPage: number = 1; // Current page
  visibleMapData: ISchoolData[] = [];
  schoolSelected: Subject<ISchoolData> = new Subject();
  rowSelected: ISchoolData | null = null;

  ngOnInit(): void {
    // get values for dropdowns
    const mapCity = new Map(
      this.dataSource
        .flatMap((x) => {
          return {
            id: x.city,
            value: x.city,
            selected: false,
          };
        })
        .map((pos) => [pos.id, pos])
    );
    this.cityList = [...mapCity.values()];

    const mapSchoolType = new Map(
      this.dataSource
        .flatMap((x) => {
          return {
            id: x.schoolTypeId,
            value: x.schoolTypeDesc,
            selected: false,
          };
        })
        .map((pos) => [pos.id, pos])
    );
    this.schoolTypeList = [...mapSchoolType.values()];

    const mapSchoolCategory = new Map(
      this.dataSource
        .flatMap((x) => {
          return {
            id: x.schoolCategoryId,
            value: x.schoolCategoryDesc,
            selected: false,
          };
        })
        .map((pos) => [pos.id, pos])
    );
    this.schoolCategoryList = [...mapSchoolCategory.values()];
  }

  get visibleData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.dataSource.slice(startIndex, endIndex);
  }

  setViewSchool(item: ISchoolData) {
    this.rowSelected = item;
    this.schoolSelected.next(item);
  }

  getPages(): number[] {
    const totalPages = this.totalPages();
    return Array(totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  totalPages(): number {
    return Math.ceil(this.dataSource.length / this.itemsPerPage);
  }

  onChangeView() {
    this.mapView = !this.mapView;
  }
}
