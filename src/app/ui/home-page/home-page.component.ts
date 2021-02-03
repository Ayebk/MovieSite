import { Component, Injectable, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { DataService } from 'src/app/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieDb } from 'src/app/models/MovieDb';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

@Injectable()
export class HomePageComponent implements OnInit {

  public moviesDbs:Array<MovieDb>;

  public actionMovies:Array<MovieDb>;

  public comedyMovies:Array<MovieDb>;

  

  get movies(): Array<Movie> {
    return this.data.getMovies();
  }
  constructor(private data: DataService,private HttpClient: HttpClient) { 
    this.moviesDbs = [];
    this.actionMovies = [];
    this.comedyMovies = [];
    
  }



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

    this.GetAllAction().subscribe({
      next:(result:Array<MovieDb>) => {
        this.actionMovies = result;
      },
      error:(err:any)=>{
        console.log(err);
      },
      complete:() =>{
        console.log(this.moviesDbs);
      }
    })

    this.GetAllComedy().subscribe({
      next:(result:Array<MovieDb>) => {
        this.comedyMovies = result;
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
    return this.HttpClient.get<Array<MovieDb>>('http://localhost:65000/movie/All',{
      headers:{
        'Content-Type':'application/json'
      }
    });
  }

  GetAllAction() : Observable<Array<MovieDb>>{
    return this.HttpClient.get<Array<MovieDb>>('http://localhost:65000/movie/AllAction',{
      headers:{
        'Content-Type':'application/json'
      }
    });
  }

  GetAllComedy() : Observable<Array<MovieDb>>{
    return this.HttpClient.get<Array<MovieDb>>('http://localhost:65000/movie/AllComedy',{
      headers:{
        'Content-Type':'application/json'
      }
    });
  }

  ngOnInit(): void {
    this.getMovies();
  }

}
