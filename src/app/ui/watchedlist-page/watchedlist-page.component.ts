import { Component, Injectable, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieWatchedList } from 'src/app/models/MovieWatchedList';
import { MovieDb } from 'src/app/models/MovieDb';

@Component({
  selector: 'app-watchedlist-page',
  templateUrl: './watchedlist-page.component.html',
  styleUrls: ['./watchedlist-page.component.css']
})
@Injectable()
export class WatchedlistPageComponent implements OnInit {


  public moviesDbs: Array<MovieWatchedList>;
  public userId:number;

  constructor(private data: DataService, private HttpClient: HttpClient) { this.moviesDbs = []; 
  this.userId = NaN;}



  getMovies() {

    this.userId = Number(localStorage.getItem('userId'));
    if (isNaN(this.userId)) {
      alert("you aren't logged in");
    }
    else {
      this.GetWatchedList(this.userId).subscribe({
        next: (result: Array<MovieWatchedList>) => {
          console.log(result);
          this.moviesDbs = result;
          this.moviesDbs.map(element => {
            if (element.id !== element.reviewMovieId) {
              element.content = "";
              element.rating = 0;
              element.reviewid = 0;
            }
          })
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          console.log(this.moviesDbs);
        }
      })
    }

  }


  GetWatchedList(userid: number): Observable<Array<MovieWatchedList>> {
    return this.HttpClient.post<Array<MovieWatchedList>>(this.data.getBackEndUrl() + '/watched/WatchedList',
      {
        userid: userid
      }
      , {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }



  RatingCompare(rating: number, compare: number) {
    return (rating === compare);
  }

  ratingClick(operation: MouseEvent,movieDb:MovieWatchedList,userRating:number)
  {
    
    
    this.moviesDbs.map(element => {
      if (element.id === movieDb.id) {
        element.rating = userRating
        console.log("I am clicked "+element.rating);
      }
    })
    
  }

  contentChanged(value:string,movieDb:MovieWatchedList){
    this.moviesDbs.map(element => {
      if (element.id === movieDb.id) {
        element.content = value
      }
    })
  }

  UpdateReviewClicked(operation: MouseEvent, movieDb: MovieWatchedList) {

    this.UpdateReviewHttpCall(movieDb,this.userId).subscribe({
      next: (result: string) => {
        
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log(this.moviesDbs);
      }
    })
    
  }

  UpdateReviewHttpCall(movieDb: MovieWatchedList, userId: number): Observable<string> {
    return this.HttpClient.post<string>(this.data.getBackEndUrl() + '/review/PostReview', {
      id: movieDb.reviewid,
      movieid: movieDb.movieid,
      userid: userId,
      content: movieDb.content,
      rating: movieDb.rating
    }
    , {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  ngOnInit(): void {
    this.getMovies();
  }

}
