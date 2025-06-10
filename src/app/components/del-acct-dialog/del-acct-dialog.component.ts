import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-del-acct-dialog',
  imports: [
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    FormsModule
  ],
  templateUrl: './del-acct-dialog.component.html',
  styleUrl: './del-acct-dialog.component.scss'
})
export class DelAcctDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DelAcctDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  confirm(is_del: boolean) {
    this.dialogRef.close(is_del);
  }
}
