import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class HeroService {
    constructor(
        private af: AngularFire
    ) {}
    getHeroes(): Promise<Hero[]> {
        return new Promise((resolve, reject) => {
            var heroes: Hero[] = [];
            this.af.database.list('/heroes').subscribe(results => {
                resolve(results.map(h => h as Hero));
            })
        });
    }
    
    getHero(id: number): Promise<Hero> {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getHeroes()), 2000);
       });
    }


}
