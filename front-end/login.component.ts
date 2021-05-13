import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  submit(ngForm:NgForm){

    console.log(ngForm.value)
    this.loginService.login(ngForm.value.username,ngForm.value.password).subscribe(
      (response:any)=>{
        console.log('response: ',response)
        localStorage.setItem('accessToken',response.accessToken)
        localStorage.setItem('username',ngForm.value.username)
        
      },error=>{
        console.log('error: ',error)
      }
    )

  }

}
