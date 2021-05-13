import { Route, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }
  validateToken(){
    this.loginService.validateToken().subscribe(
      (res:any)=>{
       console.log(res)
       if(res.status==="valid token"){
         this.router.navigate(['home'])
       }
      },err=>{
console.log('err: ',err)
      }
    )

  }

}
