import { Routes } from '@angular/router';
import { CocktailsComponent } from './cocktails/cocktails.component';
import { CocktailDetailsComponent } from './cocktails/cocktail-details/cocktail-details.component';

export const routes: Routes = [
    {
        path: 'cocktails',
        title: 'Cocktails',
        component: CocktailsComponent
    },
    {
        path: 'cocktails/:cocktailId',
        title: 'Cocktail details',
        component: CocktailDetailsComponent
    },
    {
        path: '**',
        redirectTo: 'cocktails'
    },
];
