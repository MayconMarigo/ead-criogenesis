import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagesLoadedEvent } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'visualizar-pdf-dialog',
  templateUrl: './visualizar-pdf-dialog.component.html',
  styleUrls: ['./visualizar-pdf-dialog.component.css'],
})
export class VisualizarPdfDialogComponent implements OnInit {
  pagina = 1;
  paginasQuantidade: number = 0;
  pdfSrc: string = '';

  constructor(
    private dialogRef: MatDialogRef<VisualizarPdfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.pdfSrc = this.data.src;
  }

  fecharDialog() {
    this.dialogRef.close();
  }

  isPrimeiraPagina() {
    return this.pagina == 1;
  }

  isUltimaPagina() {
    return this.pagina == this.paginasQuantidade;
  }

  public onPagesLoaded(event: PagesLoadedEvent): void {
    this.paginasQuantidade = event.pagesCount;
  }

  recuarPagina() {
    if (!this.isPrimeiraPagina()) this.pagina--;
  }
  proximaPagina() {
    if (!this.isUltimaPagina()) this.pagina++;
  }

  baixarDocumento(pdf: any) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', pdf, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(this.response);
      var tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = Date.now().toString();
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    };
    xhr.send();
  }
}
