import { Component, DestroyRef, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CocktailsService } from '../cocktails.service';
import { Cocktail } from '../cocktail.model';
import { Subscription } from 'rxjs';
import { FavoritesService } from '../favorites.service';
import { CommonModule } from '@angular/common';
import { CocktailDetailsLineComponent } from "./cocktail-details-line/cocktail-details-line.component";

@Component({
  selector: 'app-cocktail-details',
  standalone: true,
  imports: [RouterLink, CommonModule, CocktailDetailsLineComponent],
  templateUrl: './cocktail-details.component.html',
  styleUrl: './cocktail-details.component.scss'
})
export class CocktailDetailsComponent implements OnInit {
  cocktailId = input.required<string>();
  cocktail = signal<Cocktail | undefined>(undefined);
  error = signal<boolean>(false);

  constructor(
    private cocktailsService: CocktailsService,
    private favoritesService: FavoritesService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    const cocktailSubscription: Subscription = this.cocktailsService.getCocktailById(this.cocktailId())
      .subscribe({
        next: (cocktail: Cocktail) => this.cocktail.set(cocktail),
        error: () => this.error.set(true)
      });

    this.destroyRef.onDestroy(() => {
      cocktailSubscription.unsubscribe();
    });
  }

  get isFavorite(): boolean {
    const currentCocktail = this.cocktail();
    if (currentCocktail) {
      return this.favoritesService.isFavorite(currentCocktail.starIconId);
    }
    return false;
  }

  toggleFavorite(): void {
    const currentCocktail = this.cocktail();
    if (currentCocktail) {
      this.favoritesService.toggleFavorite(currentCocktail.starIconId);
    }
  }
}
