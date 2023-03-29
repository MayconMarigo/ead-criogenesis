import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AvaliacaoRespostaDialogComponent } from '../view/dialog/avaliacao-resposta-dialog/avaliacao-resposta-dialog.component';
import { DocumentosContratuaisDialogComponent } from '../view/dialog/documentos-contratuais-dialog/documentos-contratuais-dialog.component';
import { GenericoDialogComponent } from '../view/dialog/generico-dialog/generico-dialog.component';
import { JustificativaDialogComponent } from '../view/dialog/justificativa-dialog/justificativa-dialog.component';
import { NovoAvaliacaoDialogComponent } from '../view/dialog/novo-avaliacao-dialog/novo-avaliacao-dialog.component';
import { RecuperarSenhaDialogComponent } from '../view/dialog/recuperar-senha-dialog/recuperar-senha-dialog.component';
import { VisualizarImagemDialogComponent } from '../view/dialog/visualizar-imagem-dialog/visualizar-imagem-dialog.component';
import { VisualizarPdfDialogComponent } from '../view/dialog/visualizar-pdf-dialog/visualizar-pdf-dialog.component';
import { VisualizarVideoDialogComponent } from '../view/dialog/visualizar-video-dialog/visualizar-video-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  genericoDialog(titulo:string, descricao?:string, justBtnClose?:boolean){
    return this.dialog.open(GenericoDialogComponent, {
      width: '50vw',
      data: {
        titulo: titulo,
        descricao: descricao,
        justBtnClose: justBtnClose
      },
    });
  }
  avaliacaoRespostaDialog(resultado: any, id: number){
    return this.dialog.open(AvaliacaoRespostaDialogComponent, {
      width: '50vw',
      data: {
        resultado: resultado,
        id: id,
      },
      disableClose: true
    });
  }

  justificativaDialog(){
    return this.dialog.open(JustificativaDialogComponent, {
      width: '50vw',
    });
  }
  novoAvaliacaoDialog(testId?:string){
    return this.dialog.open(NovoAvaliacaoDialogComponent, {
      width: '80vw',
      height: '80vh',
      disableClose: true,
      data: {
        testId: testId
      }
    });
  }
  recuperarSenhaDialog(){
    return this.dialog.open(RecuperarSenhaDialogComponent, {
      width: '500px',
      panelClass: 'recuperarSenhaPanel',
      autoFocus: false
    });
  }
  visualizarPdfDialog(src:string){
    return this.dialog.open(VisualizarPdfDialogComponent, {
      width: '80vw',
      height: '90vh',
      disableClose: true,
      data: {
        src: src
      }
    });
  }
  visualizarImagemDialog(src:string){
    return this.dialog.open(VisualizarImagemDialogComponent, {
      width: '80vw',
      height: '90vh',
      disableClose: true,
      data: {
        src: src
      }
    });
  }
  visualizarVideoDialog(src:string){
    return this.dialog.open(VisualizarVideoDialogComponent, {
      width: '80vw',
      height: '80vh',
      disableClose: true,
      data: {
        src: src
      }
    });
  }
  criarDocumentoContratualDialog(){
    return this.dialog.open(DocumentosContratuaisDialogComponent, {
      width: '50vw',
      disableClose: true
    });
  }
}
