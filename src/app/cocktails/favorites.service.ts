import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class FavoritesService
 {
    private localStorageKey: string = 'favorites';
    private favorites = signal<string[]>([]);

    constructor() {
        this.loadFavorites();
    }

    private loadFavorites(): void {
        const storedFavorites = localStorage.getItem(this.localStorageKey);
        if (storedFavorites) {
            this.favorites.set(JSON.parse(storedFavorites));
        }
    }

    private saveFavorites(): void {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.favorites()));
    }

    isFavorite(starId: string): boolean {
        return this.favorites().some((favoriteId: string) => favoriteId === starId);
    }

    toggleFavorite(starId: string): void {
        if (this.isFavorite(starId)) {
            this.favorites.set(this.favorites().filter((favoriteId: string) => favoriteId !== starId));
        } else {
            this.favorites().push(starId);
        }
        this.saveFavorites();
    }
}