import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LeafletModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
