import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdCardModule,
  MdButtonModule,
  MdIconModule,
  MdToolbarModule,
  MdSidenavModule,
  MdDialogModule,
  MdInputModule,
  MdFormFieldModule,
  MdProgressBarModule,
  MdSnackBarModule,
} from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { HomeComponent, AddCourseDialogComponent } from './home/home.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import 'hammerjs';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddCourseDialogComponent,
  ],
  entryComponents: [
    AddCourseDialogComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdToolbarModule,
    MdSidenavModule,
    MdDialogModule,
    MdInputModule,
    MdFormFieldModule,
    MdProgressBarModule,
    MdSnackBarModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
