import { Component, Input } from '@angular/core';

export interface IDropdownItem {
  id: number;
  value: string;
  selected: boolean;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['dropdown.component.css'],
})
export class DropdownComponent {
  @Input() items!: IDropdownItem[];
  @Input() dropdownName: string = 'dropdown';

  onDropdownClick(event: any) {
    event.stopPropagation();
  }
}
