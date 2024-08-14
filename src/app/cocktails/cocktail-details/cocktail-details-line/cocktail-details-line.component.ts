import { Component, input } from '@angular/core';

@Component({
  selector: 'app-cocktail-details-line',
  standalone: true,
  imports: [],
  templateUrl: './cocktail-details-line.component.html',
  styleUrl: './cocktail-details-line.component.scss'
})
export class CocktailDetailsLineComponent {
  title = input.required<string>()
}
