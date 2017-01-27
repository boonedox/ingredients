import { Component } from '@angular/core';
import { RecipeService } from './recipe.service';
import { CategoryService } from './category.service';
import { TodoService } from './todo.service';
import { Ingredient } from './ingredient';
import { Category, ICategory } from './category';
import { IRecipe, Recipe } from './recipe';
import { ITodo, Todo } from './todo';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'dragula/dist/dragula.css';
import { DragulaService, dragula } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'my-recipes',
  templateUrl: 'recipes.component.html',
  styleUrls: ['recipes.component.css']
})


export class RecipesComponent implements OnInit {
    filters = {
        selected: false
    }
    sort = 'alpha'
    selectedRecipe: IRecipe;
    newRecipe: Recipe = new Recipe("", 0);
    newCategory: Category = new Category("", [], []);
    recipes: Recipe[];
    selectedRecipes: Recipe[] = [];
    sendMessage: string;
    categories: Category[] = [];
    selectedIngredients: Ingredient[] = [];
    selectedIngredients2: Ingredient[] = [];
    ngOnInit(): void {
    }
    constructor(
        private af: AngularFire,
        private recipeService: RecipeService,
        private categoryService: CategoryService,
        private todoService: TodoService,
        private router: Router,
        private dragulaService: DragulaService
    ) {
        this.dragulaService.drop.subscribe((value) => {
          this.onDrop(value.slice(1));
        });
        this.dragulaService.removeModel.subscribe((value) => {
          this.onRemove(value.slice(1));
        });
        this.getCategories();
  }
    toggleSelected() {
        this.filters.selected = !this.filters.selected;
        this.getRecipes();
    }
    alphaSort(): void {
        this.sort = 'alpha';
        this.getRecipes();
    }
    usesSort(): void {
        this.sort = 'uses';
        this.getRecipes();
    }
    useDateSort(): void {
        this.sort = 'dateLastUsed';
        this.getRecipes();
    }
    private onDrop(args) {
        let [el, target, source] = args;
        let ingredientName = el.id.split('ingredient.')[1];
        let oldCategoryName = source.id.split('category.')[1];
        let newCategoryName = target.id.split('category.')[1];
        this.categories.forEach((c) => {
            if (c.name === oldCategoryName) {
                c.ingredients = c.ingredients || [];
                c.ingredients = c.ingredients.filter((i) => i !== ingredientName);
                this.categoryService.updateCategory(c, {ingredients: c.ingredients});
            } else if (c.name === newCategoryName) {
                c.ingredients = c.ingredients || [];
                c.ingredients.push(ingredientName);
                this.categoryService.updateCategory(c, {ingredients: c.ingredients});
            }
        });
      }

    private onRemove(args) {
      let [el, source] = args;
    }

    addRecipe(): void {
        this.recipeService.createRecipe(this.newRecipe);
        this.newRecipe = new Recipe("", 0);
    }

    addCategory(): void{
        this.categoryService.createCategory(this.newCategory);
        this.newCategory = new Category("", [], []);
    }

    addRemoveSelectedIngredients(recipe: Recipe): void {
        recipe.ingredients = recipe.ingredients || [];
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

    setSelectedRecipes(): void {
        this.selectedRecipes = this.recipes.filter((r) => r.selected);
    }

    select(recipe: IRecipe): void {
        recipe.selected = !recipe.selected;
        this.addRemoveSelectedIngredients(recipe);
        this.recipeService.updateRecipe(recipe, {selected: recipe.selected});
        this.setSelectedRecipes();
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
                switch (this.sort) {
                    case 'uses':
                        n1.dateLastUsed = n1.dateLastUsed || 0;
                        n2.dateLastUsed = n2.dateLastUsed || 0;
                        if (n1.dateLastUsed > n2.dateLastUsed) {
                            return 1;
                        }
                        if (n1.dateLastUsed < n2.dateLastUsed) {
                            return -1;
                        }
                        return 0;
                    case 'uses':
                        n1.uses = n1.uses || 0;
                        n2.uses = n2.uses || 0;
                        if (parseInt(n1.uses.toString()) > parseInt(n2.uses.toString())) {
                            return 1;
                        }
                        if (parseInt(n1.uses.toString()) < parseInt(n2.uses.toString())) {
                            return -1;
                        }
                        return 0;
                    case 'alpha':
                    default:
                        if (n1.name.toLowerCase() > n2.name.toLowerCase()) {
                            return 1;
                        }
                        if (n1.name.toLowerCase() < n2.name.toLowerCase()) {
                            return -1;
                        }
                        return 0;
                }
            });
            if (this.sort === 'uses') {
                this.recipes = this.recipes.reverse();
            }
            if (this.filters.selected) {
                this.recipes = this.recipes.filter((r) => r.selected);
            }
            this.selectedIngredients.length = 0;
            this.recipes.forEach((r) => {
                if (r.selected) {
                    this.addRemoveSelectedIngredients(r);
                }
            });
            this.setSelectedRecipes();
        });
    }

    getCategories(): void {
        this.categoryService.getCategories().subscribe(categories => {
            this.categories = categories.map((c) => <Category> c);
            this.getRecipes();
        });
    }
    printIngredients(): void {
        var elem = document.getElementById('printIngredientSpan');
        var mywindow = window.open('', 'PRINT', 'height=600,width=800');
        mywindow.document.write('<html><head><title>' + document.title  + '</title>');
        mywindow.document.write('</head><body >');
        mywindow.document.write(elem.innerHTML);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();
    }
}