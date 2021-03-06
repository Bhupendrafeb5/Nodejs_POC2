import { NgModule } from '@angular/core';    
import { Routes, RouterModule } from '@angular/router';    
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'posts',component:AboutComponent},
    {path:'login',component:LoginComponent}

];    
@NgModule({    
  imports: [RouterModule.forRoot(routes)],    
  exports: [RouterModule]    
})    
export class AppRoutingModule { } 