import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieDb} from './models/MovieDb';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})



export class DataService {

  protected suggestedMovie:MovieDb;

  protected moviesdb : Array<MovieDb>;

  constructor(private http: HttpClient) { 

    this.moviesdb = [];

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

  Getmoviesdb(): Array<MovieDb>{
    if (this.moviesdb.length === 0){
      this.getMovies();
    }
    return this.moviesdb;

  }
  //this function is called when the suggest button is clicked
  setSuggestionMovie(movie:MovieDb){
    this.suggestedMovie = movie;
  }

  //this function is used when we dispaly a movie on the suggestion page
  getSuggestedMovie():any{
    return this.suggestedMovie;
  }


  getMovies():any{
    this.GetAllMovies().subscribe({
      next:(result:Array<MovieDb>) => {

        this.moviesdb = result;
        console.log(result);

      return result;
      },
      error:(err:any)=>{
        console.log(err);
        return null;


      }
    })      
  }

  GetAllMovies() : Observable<Array<MovieDb>>{
    return this.http.get<Array<MovieDb>>('http://localhost:65000/movie/All',{
      headers:{
        'Content-Type':'application/json'
      }
    });
  }
  
}


