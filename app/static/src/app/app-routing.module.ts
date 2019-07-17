import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { HomeComponent } from './home/home.component';
import { RideComponent } from './ride/ride.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SettingsComponent } from './settings/settings.component';
import { StatsComponent } from './stats/stats.component';
import { CameraComponent } from './camera/camera.component';


const appRoutes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'home', component: HomeComponent },
  { path: 'ride', component: RideComponent },
  { path: 'navigate', component: NavigationComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'camera', component: CameraComponent },
 
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
