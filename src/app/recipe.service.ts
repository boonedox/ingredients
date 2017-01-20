import { Injectable } from '@angular/core';

import { Recipe, IRecipe } from './recipe';
import { HEROES } from './mock-heroes';

import {AngularFire, FirebaseListObservable, AngularFireDatabase} from 'angularfire2';

@Injectable()
export class RecipeService {
    constructor(
        private af: AngularFire
    ) {}

    getRecipes(): FirebaseListObservable<IRecipe[]> {
        return this.af.database.list('/recipes');
    }

    createRecipe(recipe: IRecipe): firebase.Promise<any> {
        console.log("adding");
        console.log(recipe);
        return this.getRecipes().push(recipe);
    }

    removeRecipe(recipe: IRecipe): firebase.Promise<any> {
        return this.getRecipes().remove(recipe.$key);
    }

    updateRecipe(recipe: IRecipe, changes: any): firebase.Promise<any> {
        return this.getRecipes().update(recipe.$key, changes);
    }
    
    getRecipe($key: string): Promise<Recipe> {
        return new Promise(resolve => {
            this.getRecipes()
                .subscribe(recipes => resolve(recipes.find(recipe => recipe.$key === $key)));
        });
    }
}
