export interface ISchoolData {
  code: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  gradeRange: string;
  phone: string;
  fax: string | null;
  schoolTypeId: number;
  schoolTypeDesc: string;
  schoolCategoryId: number;
  schoolCategoryDesc: string;
  travelDistance: number;
  latitude: number;
  longitude: number;
}
