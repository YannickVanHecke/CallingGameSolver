

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TotalPipe } from '../pipes/TotalPipe';
@NgModule({
  declarations: [
    AppComponent,
    TotalPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [TotalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
