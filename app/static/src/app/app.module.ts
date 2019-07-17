import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { SplashComponent } from './splash/splash.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { StatsComponent } from './stats/stats.component';
import { SettingsComponent } from './settings/settings.component';
import { RideComponent } from './ride/ride.component';
import { CameraComponent } from './camera/camera.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';

import { AgmCoreModule } from '@agm/core';            // @agm/core
import { AgmDirectionModule } from 'agm-direction';   // agm-direction

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    HomeComponent,
    NavigationComponent,
    StatsComponent,
    SettingsComponent,
    RideComponent,
    CameraComponent,
  ],
  imports: [
    ButtonsModule,
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyA_EJj_JndYvh4kfX5RgzJOxrWSWXe406M',
    }),
    AgmDirectionModule,     // agm-direction
   ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
