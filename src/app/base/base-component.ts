import { MdSnackBar } from '@angular/material';

/**
 * Base class for components to extend.
 *
 * @export
 * @class BaseComponent
 */
export class BaseComponent {
  constructor(private snackbar: MdSnackBar) { }

  /**
   * Shows a snackbar with the given message. Does not close until the close action is clicked.
   *
   * @param {string} message the error message to display
   * @memberof BaseComponent
   */
  showError(message: string) {
    const snackbarRef = this.snackbar.open(message, 'Fechar');
    snackbarRef.onAction().subscribe(() => {
      snackbarRef.dismiss();
    });
  }

  /**
   * Shows a snackbar with a simple message and no action. Closes after 3 seconds.
   *
   * @param {string} message the mssage to display in the snackbar
   * @memberof BaseComponent
   */
  showMessage(message: string) {
    this.snackbar.open(message, null, {
      duration: 3000,
    });
  }
}
