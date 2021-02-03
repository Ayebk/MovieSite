import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { DataService } from 'src/app/data.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieDb } from 'src/app/models/MovieDb';


@Component({
  selector: 'app-suggestion-page',
  templateUrl: './suggestion-page.component.html',
  styleUrls: ['./suggestion-page.component.css']
})
@Injectable()
export class SuggestionPageComponent implements OnInit {



 
  
    public moviesDbs:Array<MovieDb>;
    public suggestedMovie:MovieDb;

    get movies(): Array<Movie> {
      return this.data.getMovies();
      
    }
    constructor(private data: DataService,private HttpClient: HttpClient) {
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
       count:0}


       this.moviesDbs = [];
       this}
  
  
  
    getMovies(){
  
      this.GetAllMovies().subscribe({
        next:(result:Array<MovieDb>) => {
          this.moviesDbs = result;
        },
        error:(err:any)=>{
          console.log(err);
        },
        complete:() =>{
          console.log(this.moviesDbs);
        }
      })
      
      
      /*
      this.GetAllMovies().subscribe({
        next:(result:string) =>{
          console.log(result);
        },
        error:(err:any)=>{
          console.log(err);
        }
      })
      */
    }
  
  
    GetAllMovies() : Observable<Array<MovieDb>>{
      return this.HttpClient.get<Array<MovieDb>>('http://localhost:65000/getAllMovies',{
        headers:{
          'Content-Type':'application/json'
        }
      });
    }
  
    
  //a function thats called whenever the suggest button is clicked
  SuggestAMovie(){
  
    let userId = Number(localStorage.getItem('userId'));
    if(isNaN(userId)){
      userId = 0;
    }
    this.SuggestMoviePost(userId).subscribe({
      next:(result:Array<MovieDb>) => {
        //we set the suggested movie
        this.suggestedMovie  = result[0]
        console.log(this.data.getSuggestedMovie());
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

    //Http call to post suggest details, returns a movie
    SuggestMoviePost(id:number) : Observable<Array<MovieDb>>{
      return this.HttpClient.post<Array<MovieDb>>('http://localhost:65000/movie/Suggest',{
        id:id
      },
      {
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    })
    }
    
    ngOnInit(): void {
      this.getMovies();
      this.SuggestAMovie();
    }
  
  }
