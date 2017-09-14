import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

import { BaseComponent } from '../base/base-component';
import { Course } from '../model/course';

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
  public courseForm: FormGroup;

  /**
   * The logged in user observable.
   */
  private user: Observable<firebase.User>;

  constructor(
    public dialogRef: MdDialogRef<AddCourseDialogComponent>,
    private db: AngularFireDatabase,
    afAuth: AngularFireAuth,
    snackbar: MdSnackBar,
    formBuilder: FormBuilder,
  ) {
    super(snackbar);

    this.course = { name: undefined, description: undefined, members: {} };
    this.user = afAuth.authState;

    this.courseForm = formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
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
        // Gets the logged in user
        this.user.subscribe(async (loggedUser) => {
          // Adds the user to the members of the course
          this.course.members[loggedUser.uid] = true;

          // Saves the new course, does not wait for write to finnish
          const courseRef = this.db.list('/courses').push(this.course);

          // Deletes the members list to now save the course basic information in the users course list.
          delete this.course['members'];

          // Saves the course in the users courses list and waits for both writes to complete.
          await Promise.all([this.db.object(`/users/${loggedUser.uid}/courses/${courseRef.key}`).set(this.course), courseRef]);
          this.showMessage('Disciplina adicionada com sucesso');
          this.dialogRef.close();
        });
      }
    } catch (error) {
      this.showError(error.message);
    }
  }
}
