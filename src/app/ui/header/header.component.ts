import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDb } from 'src/app/models/MovieDb';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

@Injectable()
export class HeaderComponent implements OnInit {

  public userLoggedIn:boolean;

  public username:string;

  constructor(private HttpClient: HttpClient,private data: DataService) {
     this.userLoggedIn = false;
     this.username = ""
    }


  //a function thats called whenever the login button is clicked, this function then calls the logInPost
  logIn(operation:MouseEvent, username:string, password:string){
    this.logInPost(username,password).subscribe({
      next:(result:string) =>{
        console.log(result);
        //storing the user id in the localStorage
        localStorage.setItem('userId',result);
        localStorage.setItem('username',this.username);
        this.ngOnInit();
        
      },
      error:(err:any)=>{
        console.log(err);
        username = "";
      }
    })
  }

  //a function that is called when the logout button is clicked
  logOut(operation:MouseEvent){
    localStorage.removeItem('userId');
    localStorage.setItem('userId','none');
    this.username = "";
    this.userLoggedIn = false;
  }

  //Http call to post login details, returns the user id on success
  logInPost(username:string, password:string) : Observable<string>{

    this.username = username;
    return this.HttpClient.post<string>('http://localhost:65000/user/login',{
      username:username,
      password:password
    },
    {
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  })
  }
  
  ngOnInit(): void {

    let userId = Number(localStorage.getItem('userId'));
    if(isNaN(userId)){
      this.userLoggedIn = false;
      console.log(userId);
      console.log("not logged on");
    }
    else
    {
      this.userLoggedIn = true;
      this.username = String(localStorage.getItem('username'));
      console.log(userId);
      console.log("logged on");
    }
  }

}
