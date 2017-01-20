import { Injectable } from '@angular/core';

import { Ingredient } from './ingredient';

import {AngularFire, FirebaseListObservable, AngularFireDatabase} from 'angularfire2';

@Injectable()
export class IngredientService {
    constructor(
        private af: AngularFire
    ) {}

    getIngredients(): FirebaseListObservable<Ingredient[]> {
        return this.af.database.list('/ingredients');
    }

/*
    createIngredient(ingredient: Ingredient): firebase.Promise<any> {
        return this.getIngredients().push(ingredient);
    }

    removeIngredient(ingredient: Ingredient): firebase.Promise<any> {
        return this.getIngredients().remove(ingredient.$key);
    }

    updateIngredient(ingredient: Ingredient, changes: any): firebase.Promise<any> {
        return this.getIngredients().update(ingredient.$key, changes);
    }
    
    getIngredient($key: string): Promise<Ingredient> {
        return new Promise(resolve => {
            this.getIngredients()
                .subscribe(ingredients => resolve(ingredients.find(ingredients => ingredients.$key === $key)));
        });
    }
    */
}
