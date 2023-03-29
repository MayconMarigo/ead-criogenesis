import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CursoService } from 'src/app/service/curso.service';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'novo-curso',
  templateUrl: './novo-curso.component.html',
  styleUrls: ['./novo-curso.component.css']
})
export class NovoCursoComponent implements OnInit {

  curso: any = {};
  video = {} as any;
  contents: any[] = [];
  indicesAbertos: any[] = [];
  topics: any[] = [{ id: 0, value: '' }] as any;

  dentista: boolean = false;
  medicina: boolean = false;
  enfermagem: boolean = false;
  criogenesis: boolean = false;
  outros: boolean = false;

  loading: boolean = false;

  contentTipo = 'pdf';

  instrutor: any = {};
  imagemCurso:any;

  constructor(private dialogService: DialogService, private cursoService: CursoService, private router: Router, private toastrService:ToastrService, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  adicionarNovoTopic(indice: any) {
    if(!indice){
      indice = this.topics.length - 1;
      this.topics.push({ id: indice + 1, value: '' });
      setTimeout(() => {
        const elemento = this.renderer.selectRootElement("#topic" + (indice + 1).toString());
        setTimeout(() => { elemento.focus(); }, 0)
      }, 50);
      return;
    }
    if (this.topics[this.topics.length - 1].value != '') {
      this.topics.push({ id: indice + 1, value: '' });

      setTimeout(() => {
        const elemento = this.renderer.selectRootElement("#topic"+(indice+1).toString());
        setTimeout(()=>{elemento.focus();}, 0)
      }, 50);
      return;
    }
    if ((indice != this.topics.length - 1) && this.topics[indice].value == '') {
      this.topics.splice(indice, 1);
      return;
    }
  }

  registrarTopic(e: any, indice: number) {
    this.topics[indice] = e.target.value;
  }

  abrirNovoAvaliacao() {
    this.dialogService.novoAvaliacaoDialog().afterClosed().subscribe((response) => { })
  }

  gerenciarFileInput(event: any) {
    let arquivo: File | null = event.files.item(0);
    if (arquivo?.type.split('/')[0] == 'image') {
      this.video.arquivo = arquivo;
      this.video.arquivoNome = arquivo?.name.split('.')[0];
      this.video.extensao = arquivo?.type.split('/')[1];
      this.video.status = "P"; // Exemplo Visual
    }
  }

  gerenciarImagemCurso(event: any) {
    let arquivo: File | null = event.files.item(0);
    if (arquivo?.type.split('/')[0] == 'image') {
      this.video.arquivo = arquivo;
      this.video.arquivoNome = arquivo?.name.split('.')[0];
      this.video.extensao = arquivo?.type.split('/')[1];
    }
    this.imagemCurso = arquivo;
  }

  formatarArquivoNome(video: any) {
    if (video.arquivoNome == '' || !video.arquivoNome)
      return 'Nenhuma imagem selecionada';
    return video.arquivoNome + '.' + video.extensao;
  }

  receberRetorno(e: any) {
    return e;
  }

  novaSecao(tipo: string) {
    const novaSecao = {} as any;
    novaSecao.name = '';
    novaSecao.section = this.contents.length + 1;
    novaSecao.contents = [];
    this.contents.push(novaSecao);
  }

  adicionarContent(secao: any) {
    const novoContent = {} as any;
    novoContent.type = this.contentTipo;
    secao.contents.push(novoContent);
  }

  selecionarIndice(indice: number) {
    this.indicesAbertos.includes(indice) ? this.indicesAbertos.splice(this.indicesAbertos.findIndex((i) => i == indice), 1) : this.indicesAbertos.push(indice);
  }
  estaSelecionado(indice: number) {
    return this.indicesAbertos.includes(indice);
  }

  gerarListaType() {
    const retorno: string[] = [];
    if (this.enfermagem)
      retorno.push('1');
    if (this.medicina)
      retorno.push('2');
    if (this.dentista)
      retorno.push('3');
    if (this.criogenesis)
      retorno.push('0');
    if (this.outros)
      retorno.push('4');
    return retorno;
  }

  confirmar() {
    if(!this.loading){
      this.loading = true;
      this.curso.topics = this.topics.map(e => e.value);
      this.curso.topics.splice(this.topics.length - 1, 1);
      this.curso.types = this.gerarListaType();
      this.curso.contents = this.contents;
      this.cursoService.courseAddAdmin(this.curso).subscribe((response)=>{
        this.curso = response;
        this.toastrService.success('Curso criado com sucesso!', 'Sucesso');
        this.router.navigateByUrl('admin/gerenciar/curso/todos/'+this.curso.id+'/editar');
      },(_)=>{
        this.loading = false;
      })
    }
  }
}
