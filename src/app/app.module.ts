import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeIngredientsComponent } from './recipe-ingredients.component';
import { RecipesComponent }     from './recipes.component';
import { RecipeService } from './recipe.service';
import { TodoService } from './todo.service';
import { IngredientService } from './ingredient.service';
import { DashboardComponent } from './dashboard.component';
import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }  from './app.component';
import { AngularFireModule } from 'angularfire2';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

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
        DragulaModule
    ],
    providers: [ RecipeService, IngredientService, TodoService ],
    declarations: [ 
      AppComponent,
      RecipeDetailComponent,
      RecipeIngredientsComponent,
      RecipesComponent,
      DashboardComponent,
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }

