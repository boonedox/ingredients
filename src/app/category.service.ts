import { Injectable } from '@angular/core';

import { ICategory, Category } from './category';

import {AngularFire, FirebaseListObservable, AngularFireDatabase} from 'angularfire2';

@Injectable()
export class CategoryService {
    constructor(
        private af: AngularFire
    ) {}

    getCategories(): FirebaseListObservable<ICategory[]> {
        return this.af.database.list('/categories');
    }

    createCategory(category: ICategory): firebase.Promise<any> {
        return this.getCategories().push(category);
    }

    removeCategory(category: ICategory): firebase.Promise<any> {
        return this.getCategories().remove(category.$key);
    }

    updateCategory(category: ICategory, changes: any): firebase.Promise<any> {
        return this.getCategories().update(category.$key, changes);
    }
    
    getCategory($key: string): Promise<ICategory> {
        return new Promise(resolve => {
            this.getCategories()
                .subscribe(categories => resolve(categories.find(categories => categories.$key === $key)));
        });
    }
}
