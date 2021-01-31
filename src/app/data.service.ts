import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../app/models/Movie';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  protected movies: Array<Movie> = [];


  constructor(private http: HttpClient) { 

    this.http.get<Array<Movie>>('../assets/Movies.json')
             .subscribe(Movies=> {
               this.movies = Movies;
             });

  }

  getMovies(): any[] {
    return this.movies;
  }
}
