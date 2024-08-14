import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { CocktailsService } from './cocktails.service';
import { Cocktail } from './cocktail.model';
import { Subscription } from 'rxjs';
import { CocktailPreviewComponent } from "./cocktail-preview/cocktail-preview.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cocktails',
  standalone: true,
  imports: [CocktailPreviewComponent, FormsModule],
  templateUrl: './cocktails.component.html',
  styleUrl: './cocktails.component.scss'
})
export class CocktailsComponent implements OnInit {
  cocktails = signal<Cocktail[] | undefined>(undefined);
  cocktailFilter = signal<string>("");
  error = signal<boolean>(false);

  constructor(
    private cocktailsService: CocktailsService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    const cocktailsSubscription: Subscription = this.cocktailsService.getCocktails()
    .subscribe({
      next: (cocktails: Cocktail[]) => this.cocktails.set(cocktails),
      error: () => this.error.set(true)
    });

    this.destroyRef.onDestroy(() => {
      cocktailsSubscription.unsubscribe();
    });
  }

  get filteredCocktails(): Cocktail[] {
    return this.cocktails()?.filter((cocktail: Cocktail) => 
      cocktail.name.toLowerCase().includes(this.cocktailFilter().toLowerCase()))
      || [];
  }
}
