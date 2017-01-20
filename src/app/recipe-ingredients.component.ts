import { Component, Input, ElementRef, ViewChild, Renderer } from '@angular/core';
import { IngredientService } from './ingredient.service';
import { RecipeService } from './recipe.service';
import { Ingredient } from './ingredient';
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
    @ViewChild('quantityInput') input: ElementRef;
    @Input()
    recipe: Recipe;
    newIngredient: Ingredient = new Ingredient('', null, '');
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
        private router: Router,
        private renderer: Renderer
    ) {}

    addIngredient(): void {
        //this.ingredientService.createIngredient(this.newIngredient);
        if (!Array.isArray(this.recipe.ingredients)) {
            this.recipe.ingredients = [];
        }
        this.recipe.ingredients.push(this.newIngredient);
        this.recipeService.updateRecipe(this.recipe, {ingredients: this.recipe.ingredients});
        this.newIngredient = new Ingredient('', null, '');
        this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
    }

    //onSelect(recipe: Recipe): void {
        //this.selectedRecipe = recipe;
    //}

    delete(ingredient: Ingredient): void {
        if (confirm("Are you sure?")) {
            this.recipe.ingredients = this.recipe.ingredients.filter(i => i.name !== ingredient.name);
            this.recipeService.updateRecipe(this.recipe, {ingredients: this.recipe.ingredients});
        }
    }

/*
    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedRecipe.$key]);
    }
*/
    getRecipeIngredients(recipe: Recipe): void {
        this.recipeIngredients = recipe.ingredients;
    }

    getIngredients(): void {
        this.ingredientService.getIngredients().subscribe(ingredients => {
            this.ingredients = ingredients;
        });
    }
}