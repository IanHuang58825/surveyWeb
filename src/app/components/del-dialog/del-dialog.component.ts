import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-del-dialog',
  imports: [
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    FormsModule
  ],
  templateUrl: './del-dialog.component.html',
  styleUrl: './del-dialog.component.scss'
})
export class DelDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DelDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  confirm(is_del: boolean) {
    this.dialogRef.close(is_del);
  }
}
