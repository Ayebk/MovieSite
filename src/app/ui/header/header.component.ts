import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDb } from 'src/app/models/MovieDb';
import { DataService } from 'src/app/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

@Injectable()
export class HeaderComponent implements OnInit {

  public userLoggedIn: boolean;

  public moviesDbs: Array<MovieDb>

  public username: string;

  public actionMovies:Array<MovieDb>;

  public comedyMovies:Array<MovieDb>;

  constructor(private HttpClient: HttpClient, private data: DataService, private router:Router ) {
    this.userLoggedIn = false;
    this.username = ""
    this.moviesDbs = [];

    this.actionMovies = [];
    this.comedyMovies = [];
    
  
  }


  //a function thats called whenever the login button is clicked, this function then calls the logInPost
  logIn(operation: MouseEvent, username: string, password: string) {
    this.logInPost(username, password).subscribe({
      next: (result: string) => {
        console.log(result);
        //storing the user id in the localStorage
        localStorage.setItem('userId', result);
        localStorage.setItem('username', this.username);
        this.ngOnInit();

      },
      error: (err: any) => {
        console.log(err);
        username = "";
      }
    })
  }

  //a function that is called when the logout button is clicked
  logOut(operation: MouseEvent) {
    localStorage.removeItem('userId');
    localStorage.setItem('userId', 'none');
    this.username = "";
    this.userLoggedIn = false;
  }

  //Http call to post login details, returns the user id on success
  logInPost(username: string, password: string): Observable<string> {

    this.username = username;
    return this.HttpClient.post<string>(this.data.getBackEndUrl() + '/user/login', {
      username: username,
      password: password
    },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
  }

  SearchLikeMovie(input: String) {
    if (input !== "") {
      this.getMovieLikeInput(input).subscribe({
        next: (result: Array<MovieDb>) => {
          this.moviesDbs = result;
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }else{
      this.moviesDbs = [];
    }
  }

  getMovieLikeInput(input: String): Observable<Array<MovieDb>> {
    return this.HttpClient.post<Array<MovieDb>>(this.data.getBackEndUrl() + '/movie/Like', {
      input: input
    },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
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
     

  }

  GetAllAction() : Observable<Array<MovieDb>>{
    return this.HttpClient.get<Array<MovieDb>>(this.data.getBackEndUrl() + '/movie/AllAction',{
      headers:{
        'Content-Type':'application/json'
      }
    });
  }

  GetAllComedy() : Observable<Array<MovieDb>>{
    return this.HttpClient.get<Array<MovieDb>>(this.data.getBackEndUrl() + '/movie/AllComedy',{
      headers:{
        'Content-Type':'application/json'
      }
    });
  }

  GetAllMovies() : Observable<Array<MovieDb>>{
    return this.HttpClient.get<Array<MovieDb>>(this.data.getBackEndUrl() + '/movie/All',{
      headers:{
        'Content-Type':'application/json'
      }
    });
  }

  movieClicked(operation:MouseEvent, movie:MovieDb){
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
  }
  this.router.onSameUrlNavigation = 'reload';
    this.data.setSuggestionMovie(movie);
    this.router.navigate(['/suggetion']);
  }

  ngOnInit(): void {

    let userId = Number(localStorage.getItem('userId'));
    if (isNaN(userId)) {
      this.userLoggedIn = false;
      console.log(userId);
      console.log("not logged on");
    }
    else {
      this.userLoggedIn = true;
      this.username = String(localStorage.getItem('username'));
      console.log(userId);
      console.log("logged on");
    }
  }

}
