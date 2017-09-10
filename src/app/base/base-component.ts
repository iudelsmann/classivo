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
}
