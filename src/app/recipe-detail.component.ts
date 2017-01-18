import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'my-recipe-detail',
  templateUrl: 'recipe-detail.component.html',
  styleUrls: ['recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {
  @Input()
  recipe: Recipe;

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.recipeService.getRecipe(params['id']))
      .subscribe(recipe => this.recipe = recipe);
  }
  goBack(): void {
    this.recipeService.updateRecipe(this.recipe, {name: this.recipe.name});
    console.log(this.recipe)
    //this.location.back();
  }


  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
}
