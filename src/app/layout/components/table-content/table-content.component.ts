import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDropdownItem } from '../dropdown/dropdown.component';
import { ISchoolData } from 'src/app/models/school-data.model';
import { Subject, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-table-content',
  templateUrl: 'table-content.component.html',
  styleUrls: ['table-content.component.css'],
})
export class TableContentComponent implements OnInit {
  @Input() dataSource: ISchoolData[] = [];
  @Input() cityList!: IDropdownItem[];
  @Input() schoolTypeList!: IDropdownItem[];
  @Input() schoolCategoryList!: IDropdownItem[];
  isLoading: boolean = false;
  items: IDropdownItem[] = [];
  range: number = 60;
  mapView: boolean = false;
  itemsPerPage: number = 6; // Number of items to display per page
  currentPage: number = 1; // Current page
  schoolSelected: Subject<ISchoolData | null> = new Subject();
  rowSelected: ISchoolData | null = null;
  schoolsFiltered: Subject<ISchoolData[]> = new Subject();
  pageSelected: Subject<void> = new Subject();
  currentPosition!: google.maps.LatLngLiteral;
  @Output() onFilterData: EventEmitter<any> = new EventEmitter<any>();

  startIndex: number = 0;
  endIndex: number = 0;  

  isMobile: boolean;

  private addressCoordinateSub: Subscription;  
  private loadingSub: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private schoolService: SchoolService
  ) {
    this.isMobile = this.breakpointObserver.isMatched(Breakpoints.Handset);

    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((result) => {
      this.isMobile = result.matches;
    });

    this.addressCoordinateSub =
      this.schoolService.getAddressObservable$.subscribe((coordinate) => {
        this.currentPosition = {
          lat: coordinate.latitude,
          lng: coordinate.longitude,
        };
      });    

      this.loadingSub = this.schoolService.getLoadingObservable$.subscribe(result => this.isLoading = result);
  }

  ngOnInit(): void {}

  get visibleData(): any[] {
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = this.startIndex + this.itemsPerPage;
    var schools = this.dataSource.slice(this.startIndex, this.endIndex);
    this.schoolsFiltered.next(schools);    
    return schools;
  }

  setViewSchool(item: ISchoolData) {
    this.rowSelected = item;
    this.schoolSelected.next(item);
  }

  getPages(): number[] {
    const totalPages = this.totalPages();
    const pagination = [];
    const visiblePages = 5;
    const offset = Math.max(
      Math.min(this.currentPage - 2, totalPages - visiblePages + 1),
      1
    );

    for (let i = 0; i < visiblePages && offset + i <= totalPages; i++) {
      pagination.push(offset + i);
    }

    return pagination;
  }

  totalPages(): number {
    return Math.ceil(this.dataSource.length / this.itemsPerPage);
  }

  onChangeView() {
    this.mapView = !this.mapView;
  }

  onFilterSchools(range: number) {
    this.currentPage = 1;
    this.onFilterData.emit(range);
  }

  nextPage() {
    this.currentPage =
      this.currentPage !== this.totalPages()
        ? this.currentPage + 1
        : this.currentPage;
    this.clearSelectedSchool();
  }

  previousPage() {
    this.currentPage =
      this.currentPage !== 1 ? this.currentPage - 1 : this.currentPage;
    this.clearSelectedSchool();
  }

  setPage(page: number) {
    this.currentPage = page;
    this.clearSelectedSchool();
  }

  clearSelectedSchool() {
    this.pageSelected.next();
    this.rowSelected = null;
  }

  ngOnDestroy() {
    this.addressCoordinateSub.unsubscribe();
    this.loadingSub.unsubscribe();
  }
}
