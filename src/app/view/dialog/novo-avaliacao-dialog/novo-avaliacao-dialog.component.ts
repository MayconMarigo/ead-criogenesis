import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { isEmpty } from 'rxjs/operators';
import { CursoService } from 'src/app/service/curso.service';

@Component({
  selector: 'novo-avaliacao-dialog',
  templateUrl: './novo-avaliacao-dialog.component.html',
  styleUrls: ['./novo-avaliacao-dialog.component.css'],
})
export class NovoAvaliacaoDialogComponent implements OnInit {
  questoes = [{ id: 0, answers: [{ value: '' }] }] as any;
  respostas = [] as any;
  respostasNulas = [] as any;
  questaoSelecionado: any = {} as any;
  constructor(
    private dialogRef: MatDialogRef<NovoAvaliacaoDialogComponent>,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    if (this.data.testId)
      this.cursoService
        .courseTestAdmin(this.data.testId)
        .subscribe((response: any) => {
          this.questoes = JSON.parse(response.questions);
          this.questoes = this.questoes.sort(() => Math.random() - 0.5);
          this.questaoSelecionado = this.questoes[0];
          let i = 0;
          this.questoes.forEach((e: any) => {
            let map = [] as any;
            e.answers.forEach((e2: any) => {
              map.push({ value: e2 });
            });

            e.answers = map;

            this.adicionarOpcao(i);
            i++;
          });
          this.respostas = JSON.parse(response.answer);
        });
    if (this.respostas.length == 0) this.respostas.push(null);
  }

  novo() {
    this.questoes.push({ id: this.questoes.length, answers: [{ value: '' }] });
    this.respostas.push(null);
  }
  adicionarOpcao(indice: number, opcaoIndice?: number) {
    if (opcaoIndice == null) {
      // indice = this.questoes.length - 1;
      this.questoes[indice].answers.push({ value: '' });
      return;
    }
    if (
      this.questoes[indice].answers[this.questoes[indice].answers.length - 1]
        .value != ''
    ) {
      this.questoes[indice].answers.push({ value: '' });
      return;
    }
    if (
      opcaoIndice != null &&
      this.questoes[indice].answers[opcaoIndice].value == '' &&
      this.questoes[indice].answers.length > 1 &&
      !(opcaoIndice == this.questoes[indice].answers.length - 1)
    ) {
      this.questoes[indice].answers.splice(opcaoIndice, 1);
      return;
    }
  }

  respostaSelecionado(indice: number, opcaoIndice: number) {
    return this.respostas[indice] == opcaoIndice;
  }
  selecionarResposta(indice: number, opcaoIndice: number) {
    if (opcaoIndice != this.questoes[indice].answers.length - 1)
      this.respostas[indice] = opcaoIndice;
  }
  salvar() {
    this.respostasNulas = [];
    this.respostas.forEach((e: any, indice: any) => {
      if (e == null) {
        this.respostasNulas.push(indice);
      }
    });
    if (
      this.respostas.filter((e: any) => e != null).length ==
      this.questoes.length
    ) {
      this.questoes.forEach((e: any) => {
        e.answers.splice(e.answers.length - 1, 1);
        e.answers = e.answers.map((e: any) => e.value);
      });
      this.dialogRef.close({
        questions: this.questoes,
        answer: this.respostas,
      });
    } else {
      this.toastrService.warning(
        'Selecione a resposta de todas as questões para criar a avaliação!',
        'Aviso'
      );
    }
  }
}
