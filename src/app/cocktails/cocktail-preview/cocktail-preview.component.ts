import { Component, input } from '@angular/core';
import { Cocktail } from '../cocktail.model';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../favorites.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cocktail-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cocktail-preview.component.html',
  styleUrl: './cocktail-preview.component.scss'
})
export class CocktailPreviewComponent {
  cocktail = input.required<Cocktail>();

  constructor(
    public favoritesService: FavoritesService
  ) {}

  get isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.cocktail().starIconId);
  }

  toggleFavorite(): void {
    this.favoritesService.toggleFavorite(this.cocktail().starIconId);
  }
}
