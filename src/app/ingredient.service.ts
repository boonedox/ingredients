import { Injectable } from '@angular/core';

import { Ingredient, IIngredient } from './ingredient';

import {AngularFire, FirebaseListObservable, AngularFireDatabase} from 'angularfire2';

@Injectable()
export class IngredientService {
    constructor(
        private af: AngularFire
    ) {}

    getIngredients(): FirebaseListObservable<IIngredient[]> {
        return this.af.database.list('/ingredients');
    }

    createIngredient(ingredient: IIngredient): firebase.Promise<any> {
        return this.getIngredients().push(ingredient);
    }

    removeIngredient(ingredient: IIngredient): firebase.Promise<any> {
        return this.getIngredients().remove(ingredient.$key);
    }

    updateIngredient(ingredient: IIngredient, changes: any): firebase.Promise<any> {
        return this.getIngredients().update(ingredient.$key, changes);
    }
    
    getIngredient($key: string): Promise<Ingredient> {
        return new Promise(resolve => {
            this.getIngredients()
                .subscribe(ingredients => resolve(ingredients.find(ingredients => ingredients.$key === $key)));
        });
    }
}
