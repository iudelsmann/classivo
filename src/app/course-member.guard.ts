import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

/**
 * Guard that validates that a user is allowed to view the details of a course.
 *
 * @export
 * @class CourseMemberGuard
 * @implements {CanActivate}
 */
@Injectable()
export class CourseMemberGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) { }

  /**
   * Validates that the user can access the page.
   * Allows only a user that access a course if he/she is a member of that course.
   *
   * @param {ActivatedRouteSnapshot} route route object to verify the course which the user is trying to access
   * @returns {Observable<boolean>} Observable that resolves to boolen which grants or not access to the requested route
   * @memberof CourseMemberGuard
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    // Gets the logged user
    return this.afAuth.authState
      .take(1)
      .flatMap(user => {
        // Verifies that user is a member of the provided course
        return this.db.object(`courses/${route.params.id}/members/${user.uid}`);
      })
      .map(course => course.$exists())
      // If the user is not a member, then it should throw an error, which we then block the user from acessing the page.
      .catch(errror => Observable.of(false))
      // Redirects the user home if he/she is not allowed to access this page
      .do(allowed => !allowed ? this.router.navigate(['/home']) : true);
  }
}
