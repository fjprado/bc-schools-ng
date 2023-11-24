import { Component, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDropdownItem } from 'src/app/layout/components/dropdown/dropdown.component';
import { ISchoolData } from 'src/app/models/school-data.model';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-school-dashboard',
  templateUrl: './school-dashboard.component.html',
  styleUrls: ['school-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SchoolDashboardComponent {
  private schoolListSub: Subscription;
  displayedColumns: string[] = ['profile', 'hrate', 'exclasses', 'status'];
  data: ISchoolData[] = [];
  dataSource: ISchoolData[] = [];
  cityList: IDropdownItem[] = [];
  schoolTypeList: IDropdownItem[] = [];
  schoolCategoryList: IDropdownItem[] = [];

  constructor(private schoolService: SchoolService) {
    this.schoolListSub = this.schoolService.getSchoolObservable$.subscribe(
      (result) => {
        this.data = result;
        this.dataSource = result;

        this.cityList = this.generateList(result, 'city', 'city');
        this.schoolTypeList = this.generateList(
          result,
          'schoolTypeId',
          'schoolTypeDesc'
        );
        this.schoolCategoryList = this.generateList(
          result,
          'schoolCategoryId',
          'schoolCategoryDesc'
        );
      }
    );
  }

  generateList(source: any[], idProp: string, valueProp: string): any[] {
    const map = new Map(
      source
        .flatMap((x) => ({
          id: x[idProp],
          value: x[valueProp],
          selected: false,
        }))
        .map((pos) => [pos.id, pos])
    );

    return [...map.values()];
  }

  onFilterData(range: number) {
    let cities = this.cityList.filter((x) => x.selected).map((x) => x.value);
    let schoolCategoryIds = this.schoolCategoryList
      .filter((x) => x.selected)
      .map((x) => x.id);
    let schoolTypeIds = this.schoolTypeList
      .filter((x) => x.selected)
      .map((x) => x.id);

    this.dataSource = this.data.filter(
      (x) =>
        (cities.length == 0 || cities.includes(x.city)) &&
        (schoolCategoryIds.length == 0 ||
          schoolCategoryIds.includes(x.schoolCategoryId)) &&
        (schoolTypeIds.length == 0 || schoolTypeIds.includes(x.schoolTypeId)) &&
        x.travelDistance <= range
    );
  }

  ngOnDestroy() {
    this.schoolListSub.unsubscribe();
  }
}
