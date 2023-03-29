import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'generico-dialog',
  templateUrl: './generico-dialog.component.html',
  styleUrls: ['./generico-dialog.component.css']
})
export class GenericoDialogComponent implements OnInit {
  titulo: string = '';
  descricao: string = '';
  justBtnClose: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.titulo = this.data.titulo;
    this.descricao = this.data.descricao;
    this.justBtnClose = this.data.justBtnClose;
  }

}
