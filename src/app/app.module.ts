import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared/shared.module';
import { LoginComponent } from './layout/auth/login/login.component';
import { AuthComponent } from './layout/auth/auth.component';
import { HomeComponent } from './layout/home/home.component';
import { NavComponent } from './layout/nav/nav.component';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { ContentComponent } from './layout/content/content.component';
import { DeleteUserComponent } from './layout/home/delete-user/delete-user.component';
import { ViewUserComponent } from './layout/home/view-user/view-user.component';
import { EditUserComponent } from './layout/home/edit-user/edit-user.component';
import { AddUserComponent } from './layout/home/add-user/add-user.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    ContentComponent,
    DeleteUserComponent,
    ViewUserComponent,
    EditUserComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
