import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent }     from './heroes.component';
import { HeroService } from './hero.service';
import { DashboardComponent } from './dashboard.component';
import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }  from './app.component';
import { AngularFireModule } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
    apiKey: 'AIzaSyCciTxwhxMte4cx8OR-k4K7turf97ZMqik',
    authDomain: 'amber-fire-8613.firebaseapp.com',
    databaseURL: 'https://amber-fire-8613.firebaseio.com',
    storageBucket: 'amber-fire-8613.appspot.com',
    messagingSenderId: '474990332198'
};

@NgModule({
    imports:      [
        BrowserModule,
        FormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AppRoutingModule,
    ],
    providers: [ HeroService ],
    declarations: [ 
      AppComponent,
      HeroDetailComponent,
      HeroesComponent,
      DashboardComponent,
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }

