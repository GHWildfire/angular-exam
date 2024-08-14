import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Cocktail } from "./cocktail.model";

@Injectable({ providedIn: 'root' })
export class CocktailsService
{
    private apiUrl: string = '/cocktails';

    constructor(private http: HttpClient) {}
    
    private instantiateCocktail(data: Cocktail): Cocktail {
        return new Cocktail(
            data.id,
            data.name,
            data.isAlcoholic,
            data.imageUrl,
            data.ingredients,
            data.instructions
        );
    }

    getCocktails(): Observable<Cocktail[]> {
        return this.http.get<Cocktail[]>(this.apiUrl).pipe(
            map(dataArray => dataArray.map(data => this.instantiateCocktail(data)))
        );
    }

    getCocktailById(id: string): Observable<Cocktail> {
        return this.http.get<Cocktail>(`${this.apiUrl}/${id}`).pipe(
            map(data => this.instantiateCocktail(data))
        );
    }
}