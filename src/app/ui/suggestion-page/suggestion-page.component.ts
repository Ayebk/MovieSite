import { Component, Injectable, Input, OnInit } from '@angular/core';
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
  public displayAddButton: boolean;

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

    this.displayAddButton = true;
  }

  addMovieClicked(operation: MouseEvent) {
    let userId = Number(localStorage.getItem('userId'));
    if (isNaN(userId)) {
      alert("you aren't logged in");
    }
    else {
      this.addMovieToWatchList(this.suggestedMovie.id, userId).subscribe({
        next: (result: string) => {
          alert("added to your watched list");
          this.displayAddButton = false;
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
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

  GetGoodReviews(id: number): Observable<Array<Review>> {
    return this.HttpClient.post<Array<Review>>(this.data.getBackEndUrl() + '/review/GetGoodReviews', {
      id: id
    },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
  }

  GetLowReviews(id: number): Observable<Array<Review>> {
    return this.HttpClient.post<Array<Review>>(this.data.getBackEndUrl() + '/review/GetLowReviews', {
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
    return this.HttpClient.post<Array<MovieDb>>(this.data.getBackEndUrl() + '/movie/Suggest', {
      id: id
    },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
  }

  addMovieToWatchList(movieid: number, userid: number): Observable<string> {
    return this.HttpClient.post<string>(this.data.getBackEndUrl() + '/watched/addToWatchedList', {
      movieid: movieid,
      userid: userid
    },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
  }

  RatingCompare(rating: number, compare: number) {
    return (rating === compare);
  }

  checkIfUserHasWatchedTheMovie(userid: number) {
    console.log(this.suggestedMovie.id, userid);
    this.checkIfUserHasWatchedTheMovieHttpCall(this.suggestedMovie.id, userid).subscribe({
      next: (result: string) => {
        console.log(result);
        if (result === "true") {
          this.displayAddButton = false;
        }
        else {
          this.displayAddButton = true;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log(this.lowReviews);
      }
    })


  }

  checkIfUserHasWatchedTheMovieHttpCall(movieid: number,userid: number): Observable<string> {
    return this.HttpClient.post<string>(this.data.getBackEndUrl() + '/watched/checkIfUserWatched', {
      movieid: movieid,
      userid: userid
    },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
  }

  ngOnInit(): void {
    if (this.data.getSuggestedMovie().id === 0) {
      this.SuggestAMovie();
    }
    else {
      this.suggestedMovie = this.data.getSuggestedMovie();
      this.getReviews(this.suggestedMovie.id);
    }

    let userId = Number(localStorage.getItem('userId'));
    if (isNaN(userId)) {
      this.displayAddButton = true;
    }
    else {
      this.checkIfUserHasWatchedTheMovie(userId);
    }
  }

}
