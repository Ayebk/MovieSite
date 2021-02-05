import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieDb} from './models/MovieDb';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  protected suggestedMovie:MovieDb;

  constructor(private http: HttpClient) { 
    //empty suggested movie on init
    this.suggestedMovie = {
            id:0,
            title:"",
            director:"",
            writer:"",
            description:"",
            image:"",
            genre:"",
            stars:0,
            releaseYear:"",
            count:0
    }
  }
  //this function is called when the suggest button is clicked
  setSuggestionMovie(movie:MovieDb){
    this.suggestedMovie = movie;
  }

  //this function is used when we dispaly a movie on the suggestion page
  getSuggestedMovie():any{
    return this.suggestedMovie;
  }
}
