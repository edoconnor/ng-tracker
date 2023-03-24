import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationService } from '../location.service';
import { map } from 'rxjs/operators';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css'],
})
export class TrackerComponent implements OnInit {
  map: L.Map | null = null;
  marker: L.Marker | null = null;
  routePoints: L.LatLng[] = [];
  animatedCircleIcon = {
    icon: L.divIcon({
      className: 'css-icon',
      html: '<div class="gps_ring"></div>',
      iconSize: [18, 22],
    }),
  };
  totalDistance = 0;
  startTime: Date | null = null;
  endTime: Date | null = null;
  pace: string | null = null;

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    const fixedLocation = L.latLng(42.36331198365516, -71.05989748835607);
    this.initMap(fixedLocation);

    this.getPosition().subscribe(
      (position) => {
        if (this.map && this.marker) {
          const latLng = L.latLng(position.latitude, position.longitude);
          this.marker.setLatLng(latLng);
          this.routePoints.push(latLng);
          if (this.routePoints.length > 1) {
            const previousLatLng =
              this.routePoints[this.routePoints.length - 2];
            this.totalDistance += previousLatLng.distanceTo(latLng) / 1609.344; // Convert meters to miles
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initMap(fixedLocation: L.LatLng) {
    this.map = L.map('map').setView(fixedLocation, 16);
    L.tileLayer(
      'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
      {
        minZoom: 14,
        maxNativeZoom: 20,
        maxZoom: 20,
        crossOrigin: true,
      }
    ).addTo(this.map);
    this.marker = L.marker([0, 0], this.animatedCircleIcon).addTo(this.map);
  }

  getPosition(): Observable<{ latitude: number; longitude: number }> {
    return new Observable<{ latitude: number; longitude: number }>(
      (observer) => {
        if (navigator.geolocation) {
          const watchId = navigator.geolocation.watchPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              this.locationService.setPosition({ latitude, longitude });
              observer.next({ latitude, longitude });
            },
            (error) => {
              observer.error(error);
            }
          );
        } else {
          observer.error('Geolocation is not supported by this browser.');
        }
      }
    );
  }

  formatDistance(distance: number) {
    const miles = distance.toFixed(1);
    return `${miles} mi`;
  }

  showPopup() {
    if (this.startTime && this.endTime && this.totalDistance !== 0) {
      const elapsedTimeInSeconds = Math.floor(
        (this.endTime.getTime() - this.startTime.getTime()) / 1000
      );
      const elapsedMinutes = Math.floor(elapsedTimeInSeconds)
      }
    }
  }