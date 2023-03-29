import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/service/curso.service';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css'],
})
export class AvaliacaoComponent implements OnInit {
  testId: any;
  courseId: any;
  questaoIndiceSelecionado: number = 0;
  questaoSelecionado: any = {} as any;
  resposta = {} as any;
  questoesRespondidas: any[] = [];

  isRouteAdmin: boolean = false;

  teste: string = '';
  listaQuestoes = [] as any;

  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isRouteAdmin = this.router.url.split('/')[1] == 'admin';
    this.testId = this.route.snapshot.paramMap.get('testId');
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.carregarTeste();
  }

  carregarTeste() {
    if (this.isRouteAdmin) {
      this.cursoService
        .courseTestAdmin(this.testId)
        .subscribe((response: any) => {
          this.teste = response.test;
          this.listaQuestoes = JSON.parse(response.questions);
          this.listaQuestoes = this.listaQuestoes.sort(
            () => Math.random() - 0.5
          );
          this.questaoSelecionado = this.listaQuestoes[0];
        });
    } else {
      this.cursoService
        .courseTestStart(this.testId, this.courseId)
        .subscribe((response: any) => {
          this.teste = response.test;
          this.listaQuestoes = response.questions;
          this.listaQuestoes = this.listaQuestoes.sort(
            () => Math.random() - 0.5
          );
          this.questaoSelecionado = this.listaQuestoes[0];
        });
    }
  }

  selecionarResposta(indice: number) {
    this.resposta[this.questaoSelecionado.id] = indice;
    if (
      this.questoesRespondidas.filter((e) => e == this.questaoSelecionado.id)
        .length == 0
    ) {
      this.questoesRespondidas.push(this.questaoSelecionado.id);
    }
    // this.resposta[this.questaoSelecionado.id] = indice;
    // if(this.questoesRespondidas.filter(e => e == this.questaoSelecionado.id).length == 0){
    //   this.questoesRespondidas.push(this.questaoSelecionado.id);
    // }
  }

  irParaQuestao(numero: number, questao: any) {
    this.questaoIndiceSelecionado = numero;
    this.questaoSelecionado = questao;
  }

  estaSelecionado(numero: number) {
    return this.questaoIndiceSelecionado == numero;
  }
  estaSelecionadoUltimo() {
    return this.questaoIndiceSelecionado == this.listaQuestoes.length - 1;
  }
  estaSelecionadoPrimeiro() {
    return this.questaoIndiceSelecionado == 0;
  }
  proximaQuestao() {
    this.questaoIndiceSelecionado += 1;
    this.questaoSelecionado = this.listaQuestoes[this.questaoIndiceSelecionado];
  }
  recuarQuestao() {
    this.questaoIndiceSelecionado -= 1;
    this.questaoSelecionado = this.listaQuestoes[this.questaoIndiceSelecionado];
  }

  finalizar() {
    if (
      this.questoesRespondidas.length == this.listaQuestoes.length &&
      !this.isRouteAdmin
    ) {
      this.cursoService
        .courseTestEnd(this.teste, this.resposta)
        .subscribe((response: any) => {
          console.log(response);
          this.dialogService
            .avaliacaoRespostaDialog(response, this.testId)
            .afterClosed()
            .subscribe((response) => {
              console.log(response);

              if (response) {
                this.router.navigateByUrl('curso/' + this.courseId);
              }
            });
        });
    }
  }

  respostaSelecionado(indice: number) {
    return this.resposta[this.questaoSelecionado.id] == indice;
  }
}
