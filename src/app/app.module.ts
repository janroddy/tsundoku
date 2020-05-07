import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { BookModule } from './books/book.module';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';

//Ng decorator
@NgModule({
  //internal sources
  declarations: [
    AppComponent,
    WelcomeComponent, 
    ConvertToSpacesPipe
    
  ],
  //external sources
  imports: [
    BrowserModule,
    HttpClientModule,
    BookModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent},
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ])
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
