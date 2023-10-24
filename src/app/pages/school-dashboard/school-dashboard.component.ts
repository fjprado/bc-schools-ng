import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

export interface ISchoolData {
  schoolCode: string;
  schoolName: string;
  address: string;
  city: string;
  gradeRange: string;
  phone: string;
  schoolTypeDesc: string;
  schoolCategoryDesc: string;
  travelDistance: number;
}

const ELEMENT_DATA: ISchoolData[] = [
  {
    schoolCode: '00111',
    schoolName: 'schoolName Test',
    address: 'address Test',
    city: 'city test',
    gradeRange: '+7, +11',
    phone: '1 2326561554',
    schoolTypeDesc: 'type test',
    schoolCategoryDesc: 'category test',
    travelDistance: 1.1,
  },
  {
    schoolCode: '00111',
    schoolName: 'schoolName Test',
    address: 'address Test',
    city: 'city test',
    gradeRange: '+7, +11',
    phone: '1 2326561554',
    schoolTypeDesc: 'type test',
    schoolCategoryDesc: 'category test',
    travelDistance: 1.1,
  },
  {
    schoolCode: '00111',
    schoolName: 'schoolName Test',
    address: 'address Test',
    city: 'city test',
    gradeRange: '+7, +11',
    phone: '1 2326561554',
    schoolTypeDesc: 'type test',
    schoolCategoryDesc: 'category test',
    travelDistance: 1.1,
  },
];

@Component({
  selector: 'app-school-dashboard',
  templateUrl: './school-dashboard.component.html',
  styleUrls: ['school-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
})
export class SchoolDashboardComponent {
  displayedColumns: string[] = ['profile', 'hrate', 'exclasses', 'status'];
  dataSource = ELEMENT_DATA;
}
