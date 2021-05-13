import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
this.loginService.getPosts(localStorage.getItem('username')).subscribe(
  (response:any)=>{
    console.log('response: ',response)
  },error=>{
    console.log('error: ',error)
  }
)
  }

}
