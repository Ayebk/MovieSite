import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

@Injectable()
export class HeaderComponent implements OnInit {

  constructor(private HttpClient: HttpClient) { }

  //a function thats called whenver the login button is clicked, this function then calls the logInPost
  logIn(operation:MouseEvent, username:string, password:string){
    this.logInPost(username,password).subscribe({
      next:(result:string) =>{
        console.log(result);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  //Http call to post login details, returns the user id on success
  logInPost(username:string, password:string) : Observable<string>{
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
  }

}
