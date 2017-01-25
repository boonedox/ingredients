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
      .subscribe(recipes => {
          this.recipes = recipes.filter((r) => r.uses > 0).sort((a, b) => {
              a.uses = a.uses || 0;
              b.uses = b.uses || 0;
              if (a.uses > b.uses) {
                  return 1;
              } else if (a.uses < b.uses) {
                  return -1;
              } else {
                  return 0;
              }
          }).reverse();
          if (this.recipes.length > 5) {
            this.recipes = this.recipes.slice(0, 5);
          }
      });
  }
}

