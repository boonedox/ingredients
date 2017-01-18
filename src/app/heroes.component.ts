import { Component } from '@angular/core';
import { HeroService } from './hero.service';
import { Hero } from './hero';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  //template: ` `,
  styleUrls: ['heroes.component.css']
})

export class HeroesComponent implements OnInit {
    selectedHero: Hero;
    heroes: Hero[];
    //heroes: FirebaseListObservable<any[]>;
    ngOnInit(): void {
        this.getHeroes();
        //this.heroes.su
        //console.log(this.todos);
    }
  //constructor(af: AngularFire, heroService: HeroService) {
    constructor(
        private af: AngularFire,
        private heroService: HeroService,
        private router: Router
    ) {
        console.log(this.heroes);
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }
    
    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }

    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => {
            this.heroes = heroes;
        });
    }
}