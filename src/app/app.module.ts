import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

import { StepTotalPipe } from '../pipes/StepTotalPipe';
@NgModule({
  declarations: [
    AppComponent,
    StepTotalPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    MatExpansionModule,
  ],
  providers: [StepTotalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
