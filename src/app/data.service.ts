import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../app/models/Movie';
import { MovieDb} from './models/MovieDb';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  protected movies: Array<Movie> = [];
  
  protected suggestedMovie:MovieDb;

  constructor(private http: HttpClient) { 

    this.http.get<Array<Movie>>('../assets/Movies.json')
             .subscribe(Movies=> {
               this.movies = Movies;
             });
             
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

  getMovies(): any[] {
    return this.movies;
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
