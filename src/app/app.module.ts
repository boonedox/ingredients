import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipesComponent }     from './recipes.component';
import { RecipeService } from './recipe.service';
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
    providers: [ RecipeService ],
    declarations: [ 
      AppComponent,
      RecipeDetailComponent,
      RecipesComponent,
      DashboardComponent,
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }

