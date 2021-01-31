import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterLink } from '@angular/router';
import { HomePageComponent } from './ui/home-page/home-page.component';
import { SuggestionPageComponent } from './ui/suggestion-page/suggestion-page.component';
import { WatchedlistPageComponent } from './ui/watchedlist-page/watchedlist-page.component';

const routes: Routes = [
{path: '', component: HomePageComponent },
{path: 'suggetion', component: SuggestionPageComponent},
{path: 'watchedliste',component: WatchedlistPageComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
