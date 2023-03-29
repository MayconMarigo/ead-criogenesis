import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'avaliacao-resposta-dialog',
  templateUrl: './avaliacao-resposta-dialog.component.html',
  styleUrls: ['./avaliacao-resposta-dialog.component.css']
})
export class AvaliacaoRespostaDialogComponent implements OnInit {
  resultado: any;
  id: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.resultado = this.data.resultado;
    this.id = this.data.id;
  }

  tituloMensagem(): string {
    if (this.resultado.pass)
      return 'Parabéns, você foi ótimo!';
    return 'Que pena, quem sabe na próxima...'
  }
}
