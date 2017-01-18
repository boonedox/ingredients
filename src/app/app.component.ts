import { Component } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe';
import { OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  //template: ` `,
  styleUrls: ['app.component.css']
})

export class AppComponent {
  title = 'Tour of Heroes';
}