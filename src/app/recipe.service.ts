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
        //this.af.database.list('recipes').push({
            //name:"Nachos"
        //});
        return this.af.database.list('/recipes');
    }

    createRecipe(recipe: IRecipe): firebase.Promise<any> {
        //changes.id = recipe.$key;
        return this.getRecipes().push(recipe);
    }

    updateRecipe(recipe: IRecipe, changes: any): firebase.Promise<any> {
        //changes.id = recipe.$key;
        return this.getRecipes().update(recipe.$key, changes);
    }
    
    getRecipe($key: string): Promise<Recipe> {
        return new Promise(resolve => {
            this.getRecipes()
                .subscribe(recipes => resolve(recipes.find(recipe => recipe.$key === $key)));
        });
    }
}
