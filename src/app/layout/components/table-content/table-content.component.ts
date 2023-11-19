import { Component, OnInit, Input } from '@angular/core';
import { IDropdownItem } from '../dropdown/dropdown.component';
import { ISchoolData } from 'src/app/models/school-data.model';
import { Subject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-table-content',
  templateUrl: 'table-content.component.html',
  styleUrls: ['table-content.component.css'],
})
export class TableContentComponent implements OnInit {
  @Input() dataSource: ISchoolData[] = [];
  tableDataSource: ISchoolData[] = [];
  items: IDropdownItem[] = [];
  cityList: IDropdownItem[] = [];
  schoolTypeList: IDropdownItem[] = [];
  schoolCategoryList: IDropdownItem[] = [];
  range: number = 60;
  mapView: boolean = false;
  itemsPerPage: number = 6; // Number of items to display per page
  currentPage: number = 1; // Current page
  schoolSelected: Subject<ISchoolData | null> = new Subject();
  rowSelected: ISchoolData | null = null;
  schoolsFiltered: Subject<ISchoolData[]> = new Subject();

  isMobile: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isMobile = this.breakpointObserver.isMatched(Breakpoints.Handset);

    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit(): void {
    this.tableDataSource = this.dataSource;
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
    return this.tableDataSource.slice(startIndex, endIndex);
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
    return Math.ceil(this.tableDataSource.length / this.itemsPerPage);
  }

  onChangeView() {
    this.mapView = !this.mapView;
  }

  onFilterSchools(range: number) {
    this.currentPage = 1;
    let cities = this.cityList.filter((x) => x.selected).map((x) => x.value);
    let schoolCategoryIds = this.schoolCategoryList
      .filter((x) => x.selected)
      .map((x) => x.id);
    let schoolTypeIds = this.schoolTypeList
      .filter((x) => x.selected)
      .map((x) => x.id);
    this.tableDataSource = this.dataSource.filter(
      (x) =>
        (cities.length == 0 || cities.includes(x.city)) &&
        (schoolCategoryIds.length == 0 ||
          schoolCategoryIds.includes(x.schoolCategoryId)) &&
        (schoolTypeIds.length == 0 || schoolTypeIds.includes(x.schoolTypeId)) &&
        x.travelDistance <= range
    );

    this.schoolsFiltered.next(this.visibleData);
  }

  nextPage() {
    this.currentPage =
      this.currentPage !== this.totalPages()
        ? this.currentPage + 1
        : this.currentPage;
    this.schoolsFiltered.next(this.visibleData);
  }

  previousPage() {
    this.currentPage =
      this.currentPage !== 1 ? this.currentPage - 1 : this.currentPage;
    this.schoolsFiltered.next(this.visibleData);
  }

  setPage(page: number) {
    this.currentPage = page;
    this.schoolsFiltered.next(this.visibleData);
  }
}
