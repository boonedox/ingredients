import { Component } from '@angular/core';
import { HeroService } from './hero.service';
import { Hero } from './hero';
import { OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  //template: ` `,
  styleUrls: ['app.component.css']
})

export class AppComponent {
  title = 'Tour of Heroes';
}