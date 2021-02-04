import { Component, Injectable, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { DataService } from 'src/app/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieWatchedList } from 'src/app/models/MovieWatchedList';

@Component({
  selector: 'app-watchedlist-page',
  templateUrl: './watchedlist-page.component.html',
  styleUrls: ['./watchedlist-page.component.css']
})
@Injectable()
export class WatchedlistPageComponent implements OnInit {


  public moviesDbs: Array<MovieWatchedList>;

  get movies(): Array<Movie> {
    return this.data.getMovies();
  }
  constructor(private data: DataService, private HttpClient: HttpClient) { this.moviesDbs = []; }



  getMovies() {

    let userId = Number(localStorage.getItem('userId'));
    if (isNaN(userId)) {
      alert("you aren't logged in");
    }
    else {
      this.GetWatchedList(userId).subscribe({
        next: (result: Array<MovieWatchedList>) => {
          this.moviesDbs = result;
          this.moviesDbs.map( element => {
            if(element.id !== element.reviewMovieId)
            {
              element.content = "";
              element.userRating = 0;
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
    return this.HttpClient.post<Array<MovieWatchedList>>('http://localhost:65000/watched/WatchedList',
      {
        userid: userid
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
