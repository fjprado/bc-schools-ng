import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Subject } from 'rxjs';
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
  loading: boolean = true;
  zoom = 13;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    maxZoom: 20,
    minZoom: 9,
  };
  markers: any = [];
  infoContent = '';

  constructor() {}

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.loading = false;
      this.getMarkers();
    });

    this.schoolSelected.subscribe((markerSchool) => {
      this.getMarkers(markerSchool);
    });
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

  openInfo(marker: MapMarker, content: any) {
    let schoolContent = this.schoolList.find((x) => x.code == content);
    this.infoContent = schoolContent
      ? schoolContent?.name +
        '\n' +
        'Address: ' +
        schoolContent?.address +
        '\n' +
        'Phone: ' +
        schoolContent?.phone
      : content;
    this.infoWindow.open(marker);
  }
}
