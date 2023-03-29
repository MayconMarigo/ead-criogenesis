import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'justificativa-dialog',
  templateUrl: './justificativa-dialog.component.html',
  styleUrls: ['./justificativa-dialog.component.css']
})
export class JustificativaDialogComponent implements OnInit {
  justificativa = '';

  constructor(private dialogRef:MatDialogRef<JustificativaDialogComponent>) { }

  ngOnInit(): void {
  }

  retornarJustificativa(){
    this.dialogRef.close(this.justificativa);
  }
}
