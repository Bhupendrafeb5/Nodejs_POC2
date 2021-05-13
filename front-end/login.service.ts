import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http'
@Injectable({
    providedIn:'root',
})
export class LoginService{

    constructor(private httpClient:HttpClient){

    }

    login(username,password){
       return this.httpClient.post('http://localhost:3000/user/login',{
            username:username,password:password
        })
    }
    getPosts(username){
        return this.httpClient.post('http://localhost:3000/posts',{
             username:username
         })
     }

     validateToken(){
        return this.httpClient.post('http://localhost:3000/validateToken',{
             token:localStorage.getItem('accessToken')
         })
     }
}