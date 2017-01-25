import { Component } from '@angular/core';
import { RecipeService } from './recipe.service';
import { TodoService } from './todo.service';
import { Ingredient } from './ingredient';
import { IRecipe, Recipe } from './recipe';
import { ITodo, Todo } from './todo';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'dragula/dist/dragula.css';
import { DragulaService, dragula } from 'ng2-dragula/ng2-dragula';
import { Category } from './category';

@Component({
  selector: 'my-recipes',
  templateUrl: 'recipes.component.html',
  styleUrls: ['recipes.component.css']
})


export class RecipesComponent implements OnInit {
    selectedRecipe: IRecipe;
    newRecipe: Recipe = new Recipe("", 0);
    recipes: Recipe[];
    sendMessage: string;
    categories: Category[] = [
        new Category("Produce", ["potato", "onion", "green pepper", "red pepper"], []),
        new Category("Meat & Cheese", ["ham", "ground beef", "sausage", "chicken", "hot dogs"], []),
        new Category("Boxed/Canned", ["cereal"], []),
        new Category("Italian/Asian", ["udon noodles", "spaghetti sauce"], []),
        new Category("Mexican", ["salsa", "refried beans", "black beans"], []),
        new Category("Condiments", ["ketchup", "mustard", "pickles"], []),
        new Category("Baking/Spices", ["cumin", "powdered sugar"], []),
        new Category("Dairy", ["eggs", "milk", "cottage cheese"], []),
        new Category("Frozen", ["peas", "corn", "hashbrowns"], []),
        new Category("Chips/Crackers", ["potato chips", "taco chips", "ritz"], []),
        new Category("Unknown", [], []),
    ]
    selectedIngredients: Ingredient[] = [];
    selectedIngredients2: Ingredient[] = [];
    ngOnInit(): void {
    }
    constructor(
        private af: AngularFire,
        private recipeService: RecipeService,
        private todoService: TodoService,
        private router: Router,
        private dragulaService: DragulaService
    ) {
        this.getRecipes();
        dragulaService.dropModel.subscribe((value) => {
          this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe((value) => {
          this.onRemoveModel(value.slice(1));
        });
  }

    private onDropModel(args) {
        let [el, target, source] = args;
        // do something else
      }

    private onRemoveModel(args) {
      let [el, source] = args;
      // do something else
    }

    addRecipe(): void {
        this.recipeService.createRecipe(this.newRecipe);
        this.newRecipe = new Recipe("", 0);
    }

    addRemoveSelectedIngredients(recipe: Recipe): void {
        recipe.ingredients.forEach((ing) => {
            let found = this.selectedIngredients.find((i) => i.name === ing.name && i.unit === ing.unit);
            if (found) {
                if (recipe.selected) {
                    found.quantity = parseFloat(found.quantity.toString()) + parseFloat(ing.quantity.toString());
                } else {
                    found.quantity = parseFloat(found.quantity.toString()) - parseFloat(ing.quantity.toString());
                }
            } else if (recipe.selected) {
                this.selectedIngredients.push(new Ingredient(ing.name, ing.quantity, ing.unit));
            }
        });
        this.selectedIngredients = this.selectedIngredients.filter((i) => i.quantity > 0);
        this.categories.forEach((c) => c.selectedIngredients = []);
        this.selectedIngredients.forEach((ing) => {
            let added = false;
            this.categories.forEach((c) => {
                if (!added && (c.name === 'Unknown' || c.ingredients.some((s) => s === ing.name))) {
                    added = true;
                    c.selectedIngredients.push(ing);
                }
            });
        });
    }

    select(recipe: IRecipe): void {
        recipe.selected = !recipe.selected;
        this.addRemoveSelectedIngredients(recipe);
        this.recipeService.updateRecipe(recipe, {selected: recipe.selected});
    }
    removeSelectedIngredient(ingredient: Ingredient): void {
        this.selectedIngredients = this.selectedIngredients.filter((i) => i.name !== ingredient.name);
    }

    edit(recipe: IRecipe): void {
        this.router.navigate(['/detail', recipe.$key]);
    }

    onSelect(recipe: Recipe): void {
        this.selectedRecipe = recipe;
    }

    delete(recipe: Recipe): void {
        this.selectedRecipe = null;
        if (confirm("Are you sure?")) {
            this.recipeService.removeRecipe(recipe);
        }
    }
    
    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedRecipe.$key]);
    }
    sendList(): void {
        let todos = [];
        this.selectedIngredients.forEach((i) => {
            let unit = i.unit !== 'count' ? i.unit + ' ' : '';
            todos.push(new Todo(`${i.quantity} ${unit}${i.name}`));
        });
        this.recipes.forEach((r) => {
            let recipe :IRecipe = <IRecipe> r;
            if (recipe.selected) {
                recipe.uses = recipe.uses ? parseInt(recipe.uses.toString()) + 1 : 1;
                recipe.dateLastUsed = Math.round((new Date).getTime() / 1000);
                this.recipeService.updateRecipe(recipe, {selected: false, uses: recipe.uses, dateLastUsed: recipe.dateLastUsed});
            }
        });
        this.todoService.createTodos(todos);
        this.sendMessage = "List sent!"
        let self = this;
        setTimeout(() => {
            self.sendMessage = null;
        },
        2000);
    }

    getRecipes(): void {
        this.recipeService.getRecipes().subscribe(recipes => {
            this.recipes = recipes.sort((n1, n2) => {
                if (n1.name.toLowerCase() > n2.name.toLowerCase()) {
                    return 1;
                }
                if (n1.name.toLowerCase() < n2.name.toLowerCase()) {
                    return -1;
                }
                return 0;
            });
            this.selectedIngredients = [];
            this.recipes.forEach((r) => {
                if (r.selected) {
                    this.addRemoveSelectedIngredients(r);
                }
            })
        });
    }
    printIngredients(): void {
        var elem = document.getElementById('ingredientSpan');
        var mywindow = window.open('', 'PRINT', 'height=600,width=800');
        mywindow.document.write('<html><head><title>' + document.title  + '</title>');

        mywindow.document.write('</head><body >');
        mywindow.document.write('<h1>' + document.title  + '</h1>');
        mywindow.document.write(elem.innerHTML);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();
    }
}