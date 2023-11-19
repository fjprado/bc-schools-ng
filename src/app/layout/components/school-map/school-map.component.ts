import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  GoogleMap,
  MapDirectionsService,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import { Observable, Subject, map } from 'rxjs';
import { ISchoolData } from 'src/app/models/school-data.model';

@Component({
  selector: 'app-school-map',
  templateUrl: 'school-map.component.html',
  styleUrls: ['./school-map.component.css'],
})
export class SchoolMapComponent implements OnInit {
  @Input() schoolList!: ISchoolData[];
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @Input() schoolSelected: Subject<any> = new Subject<any>();
  @Input() schoolsFiltered: Subject<ISchoolData[]> = new Subject<
    ISchoolData[]
  >();
  @Input() rowSelected: ISchoolData | null | undefined;
  loading: boolean = true;
  zoom = 13;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    maxZoom: 20,
    minZoom: 9,
  };
  markers: any = [];
  schoolMapSelected: ISchoolData | undefined;

  directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;
  infoWindowOptions!: google.maps.InfoWindowOptions;
  mapDirectionOptions!: google.maps.DirectionsRendererOptions;

  constructor(private mapDirectionsService: MapDirectionsService) {
    this.mapDirectionOptions = {
      suppressMarkers: true,
      polylineOptions: { strokeColor: '#dc3545' },
    };

    this.infoWindowOptions = {
      maxWidth: 200,
    };
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.loading = false;
      this.getMarkers(this.rowSelected);
      if (this.rowSelected) this.getDirections(this.rowSelected);
    });

    this.schoolSelected.subscribe((markerSchool) => {
      this.getMarkers(markerSchool);
      this.getDirections(markerSchool);
    });

    this.schoolsFiltered.subscribe((schoolList) => {
      if (!this.schoolListEquals(this.schoolList, schoolList)) {
        this.schoolList = schoolList;
        this.getMarkers();
      }
    });
  }

  schoolListEquals(arr1: ISchoolData[], arr2: ISchoolData[]): boolean {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  getMarkers(markerSchool: ISchoolData | null = null) {
    if (markerSchool !== null) {
      let index = this.schoolList.findIndex(
        (x) => x.code === markerSchool.code
      );
      this.schoolList.push(this.schoolList.splice(index, 1)[0]);
    }

    let currentLocationMarker = {
      position: {
        lat: this.center.lat,
        lng: this.center.lng,
      },
      info: 'current_location',
      options: {
        icon: {
          url: '/assets/images/home.ico',
          scaledSize: new google.maps.Size(35, 35),
        },
      },
    };

    this.markers = [
      currentLocationMarker,
      ...this.schoolList.map((school) => {
        return {
          position: {
            lat: school.latitude,
            lng: school.longitude,
          },
          info: school.code,
          options: {
            icon: {
              url:
                markerSchool === null || school.code !== markerSchool?.code
                  ? '/assets/images/school.ico'
                  : '/assets/images/school-active.ico',
              scaledSize:
                markerSchool === null || school.code !== markerSchool?.code
                  ? new google.maps.Size(50, 50)
                  : new google.maps.Size(65, 65),
            },
            animation:
              markerSchool === null || school.code !== markerSchool?.code
                ? null
                : google.maps.Animation.DROP,
          },
        };
      }),
    ];
  }

  getDirections(schoolSelected: ISchoolData) {
    const request: google.maps.DirectionsRequest = {
      destination: {
        lat: schoolSelected.latitude,
        lng: schoolSelected.longitude,
      },
      origin: { lat: this.center.lat, lng: this.center.lng },
      travelMode: google.maps.TravelMode.DRIVING,
    };
    this.directionsResults$ = this.mapDirectionsService
      .route(request)
      .pipe(map((response) => response.result));
  }

  openInfo(marker: MapMarker, content: any) {
    this.schoolMapSelected = this.schoolList.find((x) => x.code == content);
    if (this.schoolMapSelected) {
      this.infoWindow.open(marker);
    }
  }
}
