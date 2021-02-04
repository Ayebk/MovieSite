import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { DataService } from 'src/app/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieDb } from 'src/app/models/MovieDb';
import { Review } from 'src/app/models/Review';


@Component({
  selector: 'app-suggestion-page',
  templateUrl: './suggestion-page.component.html',
  styleUrls: ['./suggestion-page.component.css']
})
@Injectable()
export class SuggestionPageComponent implements OnInit {





  public moviesDbs: Array<MovieDb>;
  public suggestedMovie: MovieDb;
  public goodReviews: Array<Review>;
  public lowReviews: Array<Review>;


  get movies(): Array<Movie> {
    return this.data.getMovies();

  }
  constructor(private data: DataService, private HttpClient: HttpClient) {
    this.suggestedMovie = {
      id: 0,
      title: "",
      director: "",
      writer: "",
      description: "",
      image: "",
      genre: "",
      stars: 0,
      releaseYear: "",
      count: 0
    }


    this.moviesDbs = [];

    this.goodReviews = [];

    this.lowReviews = [];

    this
  }



  getMovies() {

    this.GetAllMovies().subscribe({
      next: (result: Array<MovieDb>) => {
        this.moviesDbs = result;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log(this.moviesDbs);
      }
    })
  }


  addMovieClicked(operation:MouseEvent){
    let userId = Number(localStorage.getItem('userId'));
    if(isNaN(userId)){
      alert("you aren't logged in");
    }
    else
    {
      this.addMovieToWatchList(this.suggestedMovie.id, userId).subscribe({
        next:(result:string) => {
          alert("added to your watched list");
        },
        error:(err:any) => {
          console.log(err);
        },
        complete:() =>{
        }
      })
    }
  }

  getReviews(id: number) {

    this.GetLowReviews(id).subscribe({
      next: (result: Array<Review>) => {
        this.lowReviews = result;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log(this.lowReviews);
      }
    })

    this.GetGoodReviews(id).subscribe({
      next: (result: Array<Review>) => {
        this.goodReviews = result;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log(this.goodReviews);
      }
    });





  }

  GetAllMovies(): Observable<Array<MovieDb>> {
    return this.HttpClient.get<Array<MovieDb>>('http://localhost:65000/getAllMovies', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  GetGoodReviews(id: number): Observable<Array<Review>> {
    return this.HttpClient.post<Array<Review>>('http://localhost:65000/review/GetGoodReviews', {
      id: id
    },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  GetLowReviews(id: number): Observable<Array<Review>> {
    return this.HttpClient.post<Array<Review>>('http://localhost:65000/review/GetLowReviews', {
      id: id
    },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  //a function thats called whenever the suggest button is clicked
  SuggestAMovie() {

    let userId = Number(localStorage.getItem('userId'));
    if (isNaN(userId)) {
      userId = 0;
    }
    this.SuggestMoviePost(userId).subscribe({
      next: (result: Array<MovieDb>) => {
        //we set the suggested movie
        this.suggestedMovie = result[0]
        console.log(this.data.getSuggestedMovie());
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log(this.getReviews(this.suggestedMovie.id));
      }
    })
  }

  //Http call to post suggest details, returns a movie
  SuggestMoviePost(id: number): Observable<Array<MovieDb>> {
    return this.HttpClient.post<Array<MovieDb>>('http://localhost:65000/movie/Suggest', {
      id: id
    },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
  }



  addMovieToWatchList(movieid:number, userid:number): Observable<string> {
    return this.HttpClient.post<string>('http://localhost:65000/watched/addToWatchedList', {
      movieid:movieid,
      userid:userid
    },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
  }

  RatingCompare(rating: number, compare: number) {
    console.log(rating === compare);
    return (rating === compare);
  }

  ngOnInit(): void {
    this.getMovies();
    if (this.data.getSuggestedMovie().id === 0) {
      this.SuggestAMovie();
    }
    else {
      this.suggestedMovie = this.data.getSuggestedMovie();
      this.getReviews(this.suggestedMovie.id);
    }

  }

}
