import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/service/curso.service';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'introducao',
  templateUrl: './introducao.component.html',
  styleUrls: ['./introducao.component.css']
})
export class IntroducaoComponent implements OnInit {

  testId: any;
  courseId: any;
  listaTentativas = [] as any;
  aprovado: boolean = false;

  constructor(private route: ActivatedRoute, private dialogService: DialogService, private cursoService: CursoService) { }

  ngOnInit(): void {
    this.testId = this.route.snapshot.paramMap.get('testId');
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.carregarTentativas();
  }

  carregarTentativas() {
    this.cursoService.courseTest(this.testId).subscribe((response: any) => {
      this.listaTentativas = response;
      this.verificarAprovado();
    })
  }

  verificarAprovado() {
    const lista: [] = this.listaTentativas;
    if (lista.find((e: any) => e.pass))
      this.aprovado = true;
  }

  formatarDataHora(dataHora: string) {
    let data = new Date(dataHora);
    let dia = this.porZeroInicio(data.getDay().toString());
    let mes = this.porZeroInicio(data.getMonth().toString());
    let ano = data.getFullYear().toString();
    let hora = this.porZeroInicio(data.getHours().toString());
    let minutos = this.porZeroInicio(data.getMinutes().toString());
    return dia + '/' + mes + '/' + ano + ' ' + hora + ':' + minutos;
  }

  porZeroInicio(valor: string) {
    if (valor.length == 1)
      return valor = '0' + valor;
    return valor;
  }

}
