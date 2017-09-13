import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

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

  constructor(
    public dialogRef: MdDialogRef<AddCourseDialogComponent>,
    formBuilder: FormBuilder,
    private db: AngularFireDatabase,
    snackbar: MdSnackBar,
    private afAuth: AngularFireAuth,
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
        // Saves the new course, does not wait for write to finnish
        const courseRef = this.db.list('/courses').push(this.course);

        // Gets the logged in user
        const user = await this.afAuth.authState.first().toPromise();

        // Saves the course in the users courses list and waits for both writes to complete.
        await Promise.all([this.db.object(`/users/${user.uid}/courses/${courseRef.key}`).set(true), courseRef]);
        this.showMessage('Disciplina adicionada com sucesso');
        this.dialogRef.close();
      }
    } catch (error) {
      this.showError(error.message);
    }
  }
}
