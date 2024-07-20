import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '@shared';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent, MainPageComponent } from './components';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConverterComponent } from './components/converter/converter.component';

@NgModule({
  declarations: [AppComponent, MainPageComponent, HeaderComponent, ConverterComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
