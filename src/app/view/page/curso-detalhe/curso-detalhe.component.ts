import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToolsUtils } from 'src/app/model/tools';
import { CursoService } from 'src/app/service/curso.service';
import { DialogService } from 'src/app/service/dialog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent extends ToolsUtils implements OnInit {

  id: any;
  preVisualizar: boolean = false;

  materias = [] as any;
  accordionItens = [] as any;
  instrutores = [] as any;
  curso: any = {} as any;

  indicesAbertos: number[] = [];
  indiceAberto: number | undefined;
  selecionar: boolean = false;

  cursoCarregado: boolean = false;

  constructor(private cursoService: CursoService, private route: ActivatedRoute, private dialogService: DialogService, private router: Router, private toastrService: ToastrService, private renderer: Renderer2) { super(); }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.carregarCurso();
  }

  avaliarCurso(score: number, type: string) {
    this.cursoService.courseReview(this.curso.id, score.toString(), type).subscribe((response) => { });
  }

  retonarScore(type: string) {
    const reviewFiltrada: [] = this.curso?.reviews?.filter((e: any) => e.type == type);
    if (reviewFiltrada && reviewFiltrada.length > 0)
      return reviewFiltrada.map((e: any) => e.score)[0];
    return 0;
  }

  preVisualizarCurso() {
    this.indiceAberto = undefined;
    this.preVisualizar = !this.preVisualizar;
  }

  carregarCurso() {
    this.cursoService.course(this.id).subscribe((response: any) => {
      this.curso = response;
      this.instrutores = response.instructors;
      this.accordionItens = response.contents;
      this.materias = response.topics;
    })
  }

  abrirPdf(item: any) {
    this.dialogService.visualizarPdfDialog(item).afterClosed().subscribe((response) => {

    });
  }
  abrirVideo(item: any) {
    if (item)
      this.dialogService.visualizarVideoDialog(item).afterClosed().subscribe((response) => {

      });
    else
      this.toastrService.error('Video corrompido, por favor entre em contato com suporte!', 'Erro ao abrir vídeo');
  }
  abrirTest(url: string, id: string) {
    if (!this.existeAlgumContentSemCheckAnterior(id)) {
      const urlSplitted = url.split('/');
      this.router.navigateByUrl('/curso/' + this.curso.id + '/introducao/' + urlSplitted[urlSplitted.length - 1]);
    } else {
      this.toastrService.warning('Avaliação somente será liberada após visualização de todos as atividades antecedentes!', 'Atenção');
    }

  }

  existeAlgumContentSemCheck() {
    let existe = false;
    this.curso.contents.map((e: any) => e.contents).forEach((content: any) => {
      content.forEach((item: any) => {
        if (item.type != 'test' && !item.viewed)
          existe = true;
      })
    })
    return existe;
  }
  existeAlgumContentSemCheckAnterior(id: string) {
    let existe = false;
    let parar = false;
    this.curso.contents.map((e: any) => e.contents).forEach((content: any) => {
      content.forEach((item: any) => {
        if (item.id == id)
          parar = true
        if (!parar && !item.viewed && item.type != 'test')
          existe = true
      })
    })
    return existe;
  }

  visualizarCurso(content: any) {
    if (!content.viewed)
      this.cursoService.courseView(content.id).subscribe((response) => {
        this.carregarCurso();
      });
    else
      this.cursoService.courseUnview(content.id).subscribe((response) => {
        this.carregarCurso();
      });
  }



  selecionarIndice(indice: number) {
    const cursoAccordionTop:any = document.getElementById('curso-accordion');
    const topPos:any = cursoAccordionTop?.offsetTop;
    if(this.indicesAbertos.includes(indice)){
      this.indicesAbertos.splice(this.indicesAbertos.findIndex((i) => i == indice), 1);
    }else{
      this.indicesAbertos.push(indice);
      const elemento:any = document.getElementById('materia'+indice);
      const elementoTopPos:any = elemento?.offsetTop;
      let qtdAccordion = 0;
      let qtdItens = 0;
      this.curso.contents.forEach((section:any, indiceSection: number) => {
        if(indiceSection < indice){
          qtdAccordion += 1;
          if(this.indicesAbertos.includes(indiceSection)){
            qtdItens += section.contents.length;
          }
        }
      });

      cursoAccordionTop.scrollTop = topPos + ((55 * qtdItens) + (64 * qtdAccordion));
    }

  }
  estaSelecionado(indice: number) {
    return this.indicesAbertos.includes(indice);
  }
}
