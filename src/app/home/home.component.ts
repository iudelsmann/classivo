import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MdDialog } from '@angular/material';

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

  constructor(db: AngularFireDatabase, private dialog: MdDialog) {
    this.courses = db.list('/courses');
    this.courses.subscribe(() => this.loading = false);
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
}
