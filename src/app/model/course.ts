/**
 * Interface to represent a Course.
 *
 * @export
 * @interface Course
 */
export interface Course {
  /**
   * The name of course.
   *
   * @type {string}
   * @memberof Course
   */
  name: string;

  /**
   * Description of the course.
   *
   * @type {string}
   * @memberof Course
   */
  description: string;

  /**
   * Collection of members of the course.
   */
  members?: object;
}
