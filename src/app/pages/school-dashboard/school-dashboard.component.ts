import { Component, ViewEncapsulation } from '@angular/core';
import { ISchoolData } from 'src/app/layout/components/table-content/table-content.component';

const ELEMENT_DATA: ISchoolData[] = [
  {
    schoolCode: '00111',
    schoolName: 'schoolName Test',
    address: 'address Test',
    cityId: 1,
    city: 'city test',
    gradeRange: '+7, +11',
    phone: '1 2326561554',
    schoolTypeId: 1,
    schoolTypeDesc: 'type test',
    schoolCategoryId: 1,
    schoolCategoryDesc: 'category test',
    travelDistance: 1.1,
  },
  {
    schoolCode: '00111',
    schoolName: 'schoolName Test',
    address: 'address Test',
    cityId: 1,
    city: 'city test',
    gradeRange: '+7, +11',
    phone: '1 2326561554',
    schoolTypeId: 1,
    schoolTypeDesc: 'type test',
    schoolCategoryId: 1,
    schoolCategoryDesc: 'category test',
    travelDistance: 1.1,
  },
  {
    schoolCode: '00111',
    schoolName: 'schoolName Test',
    address: 'address Test',
    cityId: 1,
    city: 'city test',
    gradeRange: '+7, +11',
    phone: '1 2326561554',
    schoolTypeId: 1,
    schoolTypeDesc: 'type test',
    schoolCategoryId: 1,
    schoolCategoryDesc: 'category test',
    travelDistance: 1.1,
  },
];

@Component({
  selector: 'app-school-dashboard',
  templateUrl: './school-dashboard.component.html',
  styleUrls: ['school-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SchoolDashboardComponent {
  displayedColumns: string[] = ['profile', 'hrate', 'exclasses', 'status'];
  dataSource = ELEMENT_DATA;
}
