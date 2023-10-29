import { Component, OnInit, Input } from '@angular/core';
import { IDropdownItem } from '../dropdown/dropdown.component';

export interface ISchoolData {
  schoolCode: string;
  schoolName: string;
  address: string;
  cityId: number;
  city: string;
  gradeRange: string;
  phone: string;
  schoolTypeId: number;
  schoolTypeDesc: string;
  schoolCategoryId: number;
  schoolCategoryDesc: string;
  travelDistance: number;
}

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

  ngOnInit(): void {
    // get values for dropdowns
    // this.cityList = this.dataSource.flatMap((x) => {
    //   return {
    //     id: x.cityId,
    //     value: x.city,
    //     selected: false,
    //   };
    // });

    // this.schoolTypeList = this.dataSource.flatMap((x) => {
    //   return {
    //     id: x.schoolTypeId,
    //     value: x.schoolTypeDesc,
    //     selected: false,
    //   };
    // });

    // this.schoolCategoryList = this.dataSource.flatMap((x) => {
    //   return {
    //     id: x.schoolCategoryId,
    //     value: x.schoolCategoryDesc,
    //     selected: false,
    //   };
    // });

    this.items = [
      { id: 1, value: 'Option 1', selected: false },
      { id: 2, value: 'Option 2', selected: false },
      { id: 3, value: 'Option 3', selected: false },
      // Add more items as needed
    ];
  }
}
