import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  currentPosition: {
    latitude: number | undefined;
    longitude: number | undefined;
  } = { latitude: undefined, longitude: undefined };

  isRunning: boolean = false;
  startTime: number = 0;
  endTime: number = 0;

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.locationService.position$.subscribe((position) => {
      this.currentPosition = position;
    });
  }

  startRun() {
    if (this.isRunning) {
      this.endTime = new Date().getTime();
      this.isRunning = false;
      this.saveRunData();
    } else {
      this.startTime = new Date().getTime();
      this.isRunning = true;
    }
  }

  saveRunData() {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const startTimeString = new Date(this.startTime).toLocaleTimeString();
    const endTimeString = new Date(this.endTime).toLocaleTimeString();
    const duration = (this.endTime - this.startTime) / 1000;
    const distance = 0; // TODO: Calculate the total distance
    const pace = duration / distance;

    const csvData = `${dateString},${startTimeString},${endTimeString},${duration},${distance},${pace}\n`;

    // Write to file
    const file = new Blob([csvData], { type: 'text/csv' });
    const a = document.createElement('a');
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = 'src/assets/data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
