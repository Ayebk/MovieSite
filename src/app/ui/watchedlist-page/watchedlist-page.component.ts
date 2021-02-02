import { Component, Injectable, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { DataService } from 'src/app/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieDb } from 'src/app/models/MovieDb';

@Component({
  selector: 'app-watchedlist-page',
  templateUrl: './watchedlist-page.component.html',
  styleUrls: ['./watchedlist-page.component.css']
})
@Injectable()
export class WatchedlistPageComponent implements OnInit {

  
  public moviesDbs:Array<MovieDb>;
  
  get movies(): Array<Movie> {
    return this.data.getMovies();
  }
  constructor(private data: DataService,private HttpClient: HttpClient) { this.moviesDbs = [];}



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

  ngOnInit(): void {
    this.getMovies();
  }

}
