import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {


  get movies(): Array<Movie> {
    return this.data.getMovies();
  }
  constructor(private data: DataService ) { }

  ngOnInit(): void {
  }

}
