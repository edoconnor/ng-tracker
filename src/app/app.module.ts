import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
 
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TrackerComponent } from './tracker/tracker.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TrackerComponent,
   
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, LeafletModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
