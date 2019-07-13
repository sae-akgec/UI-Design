import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { SplashComponent } from './splash/splash.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { StatsComponent } from './stats/stats.component';
import { SettingsComponent } from './settings/settings.component';
import { RideComponent } from './ride/ride.component';
import { CameraComponent } from './camera/camera.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';




@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    LoginComponent,
    HomeComponent,
    NavigationComponent,
    StatsComponent,
    SettingsComponent,
    RideComponent,
    CameraComponent,
    
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    
    BrowserAnimationsModule,
    
  
   ],
   
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
