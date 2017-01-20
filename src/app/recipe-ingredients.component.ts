import { Component, Input } from '@angular/core';
import { IngredientService } from './ingredient.service';
import { RecipeService } from './recipe.service';
import { IIngredient, Ingredient } from './ingredient';
import { Recipe } from './recipe';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'recipe-ingredients',
  templateUrl: 'recipe-ingredients.component.html',
  styleUrls: ['recipe-ingredients.component.css']
})

export class RecipeIngredientsComponent implements OnInit {
    @Input()
    recipe: Recipe;
    newIngredient: Ingredient = new Ingredient("");
    ingredients: Ingredient[];
    recipeIngredients: Ingredient[];
    ngOnInit(): void {
        this.getIngredients();
        this.getRecipeIngredients(this.recipe);
    }
    constructor(
        private af: AngularFire,
        private ingredientService: IngredientService,
        private recipeService: RecipeService,
        private router: Router
    ) {}

    addIngredient(): void {
        this.ingredientService.createIngredient(this.newIngredient);
        if (!Array.isArray(this.recipe.ingredients)) {
            this.recipe.ingredients = [];
        }
        this.recipe.ingredients.push(this.newIngredient.name);
        this.recipeService.updateRecipe(this.recipe, {ingredients: this.recipe.ingredients});
        this.newIngredient = new Ingredient("");
    }

    //onSelect(recipe: Recipe): void {
        //this.selectedRecipe = recipe;
    //}

/*
    delete(recipe: Recipe): void {
        this.selectedRecipe = null;
        if (confirm("Are you sure?")) {
            this.recipeService.removeRecipe(recipe);
        }
    }
*/    

/*
    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedRecipe.$key]);
    }
*/
    getRecipeIngredients(recipe: Recipe): void {
        this.ingredientService.getIngredients().subscribe(ingredients => {
            this.recipeIngredients = ingredients;
        });
    }

    getIngredients(): void {
        this.ingredientService.getIngredients().subscribe(ingredients => {
            this.ingredients = ingredients;
        });
    }
}