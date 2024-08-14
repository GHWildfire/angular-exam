export class Cocktail {
    constructor(
      public id: string,
      public name: string,
      public isAlcoholic: boolean,
      public imageUrl: string,
      public ingredients: string[],
      public instructions: string
    ) {}
  
    get alcoholTag(): string {
      return this.isAlcoholic ? 'tag-alcoholic' : 'tag-non-alcoholic';
    }
  
    get alcoholDescription(): string {
      return this.isAlcoholic ? 'Alcoholic' : 'Non Alcoholic';
    }
  
    get formattedIngredients(): string {
      return this.ingredients.join(' | ');
    }
    
    get starIconId(): string {
      return `star-${ this.id }`;
    }
  }
  