import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';


@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ],
})

export class DashboardComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes()
      .subscribe(recipes => this.recipes = recipes.slice(1, 5));
  }
}

