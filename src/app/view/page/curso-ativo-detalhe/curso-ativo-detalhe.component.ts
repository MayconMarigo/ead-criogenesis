import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { ToolsUtils } from 'src/app/model/tools';
import { CursoService } from 'src/app/service/curso.service';
import { DialogService } from 'src/app/service/dialog.service';
// import { AlunoService } from 'src/app/service/aluno.service';
import { CertificadoService } from 'src/app/service/certificado.service';
import { RespostaService } from 'src/app/service/resposta.service';

@Component({
  selector: 'curso-ativo-detalhe',
  templateUrl: './curso-ativo-detalhe.component.html',
  styleUrls: ['./curso-ativo-detalhe.component.css'],
})
export class CursoAtivoDetalheComponent extends ToolsUtils implements OnInit {
  abrirAluno = false;
  abrirAcoes = false;
  abrirDashboard = false;

  alunos: any = [] as any;
  alunosFiltrados: any = [] as any;
  listaCertificados: any = [] as any;
  certs = '' as any;
  tests = {} as any;

  types: any = {};

  courseURL: string = window.location.href.split('todos/')[1];
  notas: any = [];

  curso: any = {} as any;
  documento: any = '';

  id: any;
  listaAlunos = [] as any;
  listaExpandido: number[] = [];
  constructor(
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private router: Router,
    private certificadoService: CertificadoService, // private alunoService: AlunoService
    private respostaService: RespostaService
  ) {
    super();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.carregarCertificados();
    this.initTestsAnswers(this.id);
    this.getAllCoursesTypes();
    this.initAnswers();
  }

  getAllCoursesTypes() {
    this.cursoService.allCoursesAdmin().subscribe((res: any) => {
      res.forEach((r: any) => {
        this.types[r.id] = r.name;
      });
    });
  }

  initAnswers() {
    this.respostaService.getAnswers(this.id, true).subscribe((res: any) => {
      res.map((r: any) => {
        r.answer = JSON.parse(r.answer);
      });
      this.notas = res;
    });
  }
  initTestsAnswers(id: any) {
    this.respostaService.getTests(true).subscribe((res: any) => {
      res.map((t: any) => {
        if (t.course == id) {
          this.tests = t;
        }
      });
      this.tests.questions = JSON.parse(this.tests.questions);
      this.tests.answer = JSON.parse(this.tests.answer);

      this.tests.questions.map((q: any, index: number) => {
        q.correta = this.tests.answer[index];
      });
      delete this.tests.answer;
    });
  }
  selecionarUsuario(indice: number) {
    if (!this.listaExpandido.includes(indice)) {
      this.listaExpandido.push(indice);
    } else {
      const indiceRemover = this.listaExpandido.findIndex((e) => e == indice);
      this.listaExpandido.splice(indiceRemover, 1);
    }
  }

  getCertificate(user?: any) {
    this.certificadoService.getCertificateUrlAdmin(1).subscribe((res: any) => {
      this.alunos.forEach((a: any) => {
        res.forEach((r: any) => {
          if (a.name == r.name) {
            a.url = r.url;
          }
        });
      });
    });
  }

  downloadCert(documento: any) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', documento.url, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(this.response);
      var tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = 'CERTIFICADO_' + documento.name.replaceAll(' ', '_');
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    };
    xhr.send();
  }

  expandirUsuario(indice: number) {
    return this.listaExpandido.filter((e) => e == indice).length > 0;
  }

  excluirCurso(cursoId: string) {
    this.dialogService
      .genericoDialog('Confirmação', 'Deseja realmente excluir este curso?')
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.cursoService.courseRemoveAdmin(cursoId).subscribe((r) => {
            // Voltar pra tela de curso ativos
            this.router.navigateByUrl('/admin/gerenciar/curso/todos');
          });
        }
      });
  }

  usuariosNaoIniciados(): number {
    const quantidadeTotalAlunos = this.curso.users?.length;
    const quantidadeAlunosZero = this.curso.users?.filter(
      (e: any) => e.qnt == 0
    ).length;
    return (quantidadeAlunosZero / quantidadeTotalAlunos) * 100;
  }
  usuariosFinalizados(): number {
    const quantidadeTotalAlunos = this.curso.users?.length;
    const quantidadeAlunosZero = this.curso.users?.filter(
      (e: any) => e.qnt == 100
    ).length;
    return (quantidadeAlunosZero / quantidadeTotalAlunos) * 100;
  }
  usuariosAndamento(): number {
    const quantidadeTotalAlunos = this.curso.users?.length;
    const quantidadeAlunosZero = this.curso.users?.filter(
      (e: any) => e.qnt > 0 && e.qnt < 100
    ).length;
    return (quantidadeAlunosZero / quantidadeTotalAlunos) * 100;
  }

  carregarCertificados() {
    this.certificadoService.getAllCertificates(true).subscribe((response) => {
      this.carregarCursoAtivo(response);
      return (this.listaCertificados = response);
    });
  }

  carregarCursoAtivo(certs: any) {
    this.cursoService.courseAdmin(this.id).subscribe((response) => {
      this.curso = response;
      this.alunos = this.curso.users;
      this.findCertificates(certs, this.curso.users);
      this.getCertificate();

      this.alunos.map((a: any) => {
        this.notas.map((n: any) => {
          if (a.name == n.Usuario) {
            a.respostas = n.answer;
          }
        });
      });
    });
  }

  findCertificates(certs: any, alunos: any) {
    certs.forEach((c: any) => {
      alunos.forEach((a: any) => {
        if (
          c.name.toLowerCase() == a?.name.toLowerCase() &&
          c.course == this.types[this.courseURL]
        )
          this.certs += a.name + ', ';
      });
    });
  }

  filtrarAlunos(e: any) {
    return (this.alunosFiltrados = this.alunos.filter((usuario: any) =>
      usuario.name.toLowerCase().includes(e.target.value.toLowerCase())
    ));
  }

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Alunos Aprovados', 'Alunos Pendentes', 'Alunos Reprovados'],
    datasets: [
      {
        data: [20, 40, 40],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  // public pieChartPlugins = [ DatalabelsPlugin ];
  // converterParaHoraMinutos(cargaHoraria:string){
  //   const hora = cargaHoraria.split(',')[0];
  //   const minuto = cargaHoraria.split(',')[1];
  //   const calculo = Math.ceil((60 * parseInt(minuto))/100);
  //   const minutoCalculado = calculo.toString().length == 1 ? calculo + '0' : (calculo.toString());

  //   return minuto ? hora+'h'+minutoCalculado : hora+'h';
  // }
}
