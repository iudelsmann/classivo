import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MdDialog } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/mergeMap';

import { AddCourseDialogComponent } from './add-course-dialog.component';
import { Course } from '../model/course';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  /**
   * List of courses availabe.
   *
   * @type {FirebaseListObservable<Course[]>}
   * @memberof HomeComponent
   */
  public courses: FirebaseListObservable<Course[]>;

  /**
   * Flag to indicate if the courses are still loading;
   *
   * @private
   * @type {boolean}
   * @memberof HomeComponent
   */
  public loading = true;

  constructor(private dialog: MdDialog, private router: Router, db: AngularFireDatabase, afAuth: AngularFireAuth) {
    afAuth.authState.flatMap((user) => {
      this.courses = db.list(`/users/${user.uid}/courses`);
      return this.courses;
    }).subscribe((courses) => {
      this.loading = false;
    });
  }

  ngOnInit() { }

  /**
   * Opens a dialog with a form to fill and add a new course.
   *
   * @memberof HomeComponent
   */
  createCourse() {
    this.dialog.open(AddCourseDialogComponent);
  }

  /**
   * Routes the user to the details screen for the given course.
   *
   * @param {string} course the course id
   * @returns Promise that resolves when the routing is finished.
   * @memberof HomeComponent
   */
  goToCourse(course: string) {
    return this.router.navigate(['/course', course]);
  }
}
