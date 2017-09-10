import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';

import { BaseComponent } from '../base/base-component';
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
  private loading = true;

  constructor(private db: AngularFireDatabase, private dialog: MdDialog) {
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
    const dialogRef = this.dialog.open(AddCourseDialogComponent);
  }
}

@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-course-dialog.component.html',
})
export class AddCourseDialogComponent extends BaseComponent {
  /**
   * The course object to bind form inputs.
   *
   * @type {Course}
   * @memberof AddCourseDialogComponent
   */
  public course: Course;

  /**
   * Form group to create validations.
   *
   * @type {FormGroup}
   * @memberof AddCourseDialogComponent
   */
  private courseForm: FormGroup;

  constructor(
    public dialogRef: MdDialogRef<AddCourseDialogComponent>,
    formBuilder: FormBuilder,
    private db: AngularFireDatabase,
    snackbar: MdSnackBar,
  ) {
    super(snackbar);

    this.course = { name: undefined };

    this.courseForm = formBuilder.group({
      name: [null, Validators.required],
    });
  }

  /**
   * Closes the dialog returning the Course instance, if the form is valid. If invalid, does nothing.
   *
   * @memberof AddCourseDialogComponent
   */
  async save() {
    try {
      if (this.courseForm.valid) {
        await this.db.list('/courses').push(this.course);
        this.dialogRef.close();
      }
    } catch (error) {
      this.showError(error.message);
    }
  }
}
