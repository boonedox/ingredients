import { Component } from '@angular/core';
import { RecipeService } from './recipe.service';
import { IRecipe, Recipe } from './recipe';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'my-recipes',
  templateUrl: 'recipes.component.html',
  styleUrls: ['recipes.component.css']
})

export class RecipesComponent implements OnInit {
    selectedRecipe: IRecipe;
    newRecipe: Recipe = new Recipe("", 0);
    recipes: Recipe[];
    ngOnInit(): void {
        this.getHeroes();
    }
    constructor(
        private af: AngularFire,
        private recipeService: RecipeService,
        private router: Router
    ) {
        console.log(this.recipes);
    }

    addRecipe(): void {
        this.recipeService.createRecipe(this.newRecipe);
        this.newRecipe = new Recipe("", 0);
    }

    onSelect(recipe: Recipe): void {
        this.selectedRecipe = recipe;
    }

    delete(recipe: Recipe): void {
        this.selectedRecipe = null;
        if (confirm("Are you sure?")) {
            this.recipeService.removeRecipe(recipe);
        }
    }
    
    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedRecipe.$key]);
    }

    getHeroes(): void {
        this.recipeService.getRecipes().subscribe(recipes => {
            this.recipes = recipes;
        });
    }
}