import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from 'src/app/mudanca-pendente-guard.guard';
import { CursoService } from 'src/app/service/curso.service';
import { DialogService } from 'src/app/service/dialog.service';
import { ToolsUtils } from 'src/app/model/tools';

@Component({
  selector: 'editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css'],
})
export class EditarCursoComponent
  extends ToolsUtils
  implements OnInit, ComponentCanDeactivate
{
  curso: any = {} as any;
  video = {} as any;
  contents = [] as any;
  indicesAbertos: any[] = [];
  topics: any[] = [{ id: 0, value: '' }] as any;

  dentista: boolean = false;
  medicina: boolean = false;
  enfermagem: boolean = false;
  criogenesis: boolean = false;
  outros: boolean = false;
  visivel: boolean = false;

  saveLoading: boolean = false;
  saveContentLoading: boolean = false;

  cargaHoraria: string = '';

  mouseover: boolean = false;

  contentTipo = 'pdf';

  instrutor: any = {} as any;
  instrutores = [{ name: '', occupation: '', loadedFromBd: false }] as any;

  courseId: any;
  imagemCurso: any = {} as any;
  mouseoverInstrutor: any = -1;

  spinnerLoad = false;
  timeStamp: any;

  imgUrl = undefined;

  public customPatterns = {
    '0': { pattern: new RegExp('[0-9]') },
    '2': { pattern: new RegExp('[0-5]') },
  };

  constructor(
    private dialogService: DialogService,
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private renderer: Renderer2
  ) {
    super();
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.carregarCurso();
  }

  converterParaCargaHoraria(horaMinuto: string) {
    const horaMinutoSplitted = horaMinuto.split(':');
    if (
      horaMinutoSplitted.length > 1 &&
      parseInt(horaMinutoSplitted[1]).toString() != 'NaN'
    ) {
      const minuto = ((100 * parseInt(horaMinutoSplitted[1])) / 60)
        .toString()
        .replace('.', '');
      return horaMinutoSplitted[0] + ',' + minuto;
    } else {
      return horaMinutoSplitted[0];
    }
  }

  carregarCurso() {
    this.cursoService.courseAdmin(this.courseId).subscribe((response) => {
      this.curso = response;
      this.cargaHoraria = this.converterParaHoraMinutos(this.curso.workload);
      this.setarType();
      this.visivel = this.curso?.visible == '1';
      this.setarTopics();
      this.setImagemCurso(this.curso.image);
      this.contents = this.curso.contents;
      this.carregarInstrutores();
      this.spinnerLoad = false;
    });
  }

  drop(event: CdkDragDrop<string[]>, lista: any) {
    moveItemInArray(lista, event.previousIndex, event.currentIndex);
  }

  getImagemCurso() {
    if (this.timeStamp) {
      return this.imagemCurso + '?' + this.timeStamp;
    }
    return this.imagemCurso;
  }
  setImagemCurso(url: string) {
    this.imagemCurso = url;
    this.timeStamp = new Date().getTime();
  }

  adicionarInstrutor() {
    this.instrutores.push({ name: '', occupation: '', loadedFromBd: false });
  }

  removerInstrutor(indice: number) {
    if (this.instrutores[indice].loadedFromBd)
      this.dialogService
        .genericoDialog(
          'Confirmação',
          'Tem certeza que deseja excluir o instrutor?'
        )
        .afterClosed()
        .subscribe((response) => {
          if (response)
            this.cursoService
              .courseInstructorRemoveAdmin(this.courseId, indice.toString())
              .subscribe((_) => {
                this.toastrService.success(
                  'Instrutor removido do curso com sucesso!',
                  'Sucesso'
                );
                this.instrutores.splice(indice, 1);
                this.carregarCurso();
                if (this.instrutores.length == 0)
                  this.instrutores = [
                    { name: '', occupation: '', loadedFromBd: false },
                  ];
              });
        });
    else this.instrutores.splice(indice, 1);
  }

  visualizarPDF(content: any) {
    this.dialogService
      .visualizarPdfDialog(content)
      .afterClosed()
      .subscribe((_) => {});
  }

  visualizarVideo(content: any) {
    this.dialogService
      .visualizarVideoDialog(content)
      .afterClosed()
      .subscribe((_) => {});
  }
  getArquivoNome(content: any) {
    const nomeSplitted: string[] = content.urlOriginal.split('/');
    const nome = nomeSplitted[nomeSplitted.length - 1];
    return nome;
  }

  carregarInstrutores() {
    if (this.curso.instructors.length > 0) {
      this.curso.instructors.forEach((e: any) => {
        e.loadedFromBd = true;
      });
    }
    this.instrutores =
      this.curso.instructors.length > 0
        ? this.curso.instructors
        : [{ name: '', occupation: '', loadedFromBd: false }];
  }

  salvarInstrutor(instrutor: any, indice: number) {
    if (instrutor.arquivoDados)
      this.cursoService
        .courseInstructorAddAdmin(
          instrutor.arquivoDados.arquivo,
          instrutor,
          this.courseId
        )
        .subscribe((response) => {
          this.toastrService.success(
            'Instrutor adicionado ao curso!',
            'Sucesso'
          );
          this.curso = response;
          this.carregarInstrutores();
        });
    else
      this.toastrService.warning(
        'Por favor, adicione uma foto ao instrutor!',
        'Atenção'
      );
  }

  adicionarNovoTopic(indice: any) {
    if (!indice) {
      indice = this.topics.length - 1;
      this.topics.push({ id: indice + 1, value: '' });
      setTimeout(() => {
        const elemento = this.renderer.selectRootElement(
          '#topic' + (indice + 1).toString()
        );
        setTimeout(() => {
          elemento.focus();
        }, 0);
      }, 50);
      return;
    }
    if (this.topics[this.topics.length - 1].value != '') {
      this.topics.push({ id: indice + 1, value: '' });
      setTimeout(() => {
        const elemento = this.renderer.selectRootElement(
          '#topic' + (indice + 1).toString()
        );
        setTimeout(() => {
          elemento.focus();
        }, 0);
      }, 50);
      return;
    }
    if (indice != this.topics.length - 1 && this.topics[indice].value == '') {
      this.topics.splice(indice, 1);
      return;
    }
  }

  registrarTopic(e: any, indice: number) {
    this.topics[indice] = e.target.value;
  }

  setarTopics() {
    this.topics = [];
    this.curso.topics.forEach((e: any) => {
      this.topics.push({ id: this.topics.length, value: e });
    });
    this.topics.push({ id: this.topics.length, value: '' });
  }

  abrirNovoAvaliacao(content: any) {
    if (!content.possuiTest) {
      this.dialogService
        .novoAvaliacaoDialog()
        .afterClosed()
        .subscribe((response) => {
          if (response) {
            this.cursoService
              .courseContentsTestAdmin(response, content.id, this.courseId)
              .subscribe((response) => {
                this.toastrService.success(
                  'Avaliação salva com sucesso!',
                  'Sucesso'
                );
                this.carregarCurso();
              });
          }
        });
    }
  }

  visualizarAvaliacao(content: any) {
    this.dialogService
      .novoAvaliacaoDialog(content.id)
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.cursoService
            .courseContentsTestAdmin(response, content.id, this.courseId)
            .subscribe((response) => {
              this.toastrService.success(
                'Avaliação salva com sucesso!',
                'Sucesso'
              );
              this.carregarCurso();
            });
        }
      });
  }

  gerenciarImgInput(event: any, objeto: any, imagemIntroducao?: boolean) {
    let arquivo: File | null = event.files.item(0);
    if (arquivo) {
      if (
        arquivo.type.split('/')[1] != 'png' &&
        arquivo.type.split('/')[1] != 'jpg' &&
        arquivo.type.split('/')[1] != 'jpeg'
      ) {
        this.toastrService.error(
          'Formato do arquivo não é compatível! Por favor, anexar nos formatos: PNG, JPG ou JPEG',
          'Erro ao anexar imagem'
        );
      }
      // else if (arquivo.size > 10485760) {
      //   this.toastrService.error('Imagem muito grande! Tamanho máximo: 10 mb', 'Erro ao anexar imagem');
      // }
      else {
        let arquivoObj = {
          arquivo: arquivo,
          nome: arquivo?.name.split('.')[0],
          extensao: arquivo?.type.split('/')[1],
        };
        objeto.arquivoDados = arquivoObj;
        if (imagemIntroducao) {
          this.spinnerLoad = true;
          this.cursoService
            .courseImageAdmin(objeto.arquivoDados.arquivo, this.courseId)
            .subscribe(
              (response) => {
                this.toastrService.success(
                  'Imagem inserida com sucesso!',
                  'Sucesso'
                );
                this.mouseover = false;
                this.carregarCurso();
              },
              (error) => {
                this.toastrService.error(
                  'Houve algum problema ao inserir a imagem! Por favor, tente novamente!',
                  'Erro'
                );
                this.mouseover = false;
                this.carregarCurso();
              }
            );
        } else {
          this.toastrService.success(
            'Imagem inserida ao instrutor com sucesso!',
            'Sucesso'
          );
        }
      }
    }
  }

  gerenciarVideoInput(event: any, objeto: any) {
    let arquivo: File | null = event.files.item(0);
    if (arquivo) {
      if (
        arquivo.type.split('/')[1] != 'mp4' &&
        arquivo.type.split('/')[1] != 'avi' &&
        arquivo.type.split('/')[1] != 'wepp'
      ) {
        this.toastrService.error(
          'Formato do arquivo não é compatível! Por favor, anexar nos formatos: AVI, MP4 ou WEPP',
          'Erro ao anexar vídeo'
        );
      } else {
        let arquivoObj = {
          arquivo: arquivo,
          nome: arquivo?.name.split('.')[0],
          extensao: arquivo?.type.split('/')[1],
        };
        objeto.arquivoDados = arquivoObj;
      }
    }
  }

  gerenciarPDFInput(event: any, objeto: any) {
    let arquivo: File | null = event.files.item(0);
    if (arquivo) {
      if (arquivo.type.split('/')[1] != 'pdf') {
        this.toastrService.error(
          'Formato do arquivo não é compatível! Por favor, anexar no formato PDF',
          'Erro ao anexar PDF'
        );
      } else {
        let arquivoObj = {
          arquivo: arquivo,
          nome: arquivo?.name.split('.')[0],
          extensao: arquivo?.type.split('/')[1],
        };
        objeto.arquivoDados = arquivoObj;
      }
    }
  }

  formatarArquivoNome(objeto: any) {
    if (objeto?.arquivoDados?.nome == '' || !objeto?.arquivoDados?.nome)
      return 'Nenhuma imagem selecionada';
    return objeto?.arquivoDados?.nome + '.' + objeto?.arquivoDados?.extensao;
  }
  formatarPdfNome(objeto: any) {
    if (objeto?.arquivoDados?.nome == '' || !objeto?.arquivoDados?.nome)
      return 'Nenhum pdf selecionado';
    return objeto?.arquivoDados?.nome + '.' + objeto?.arquivoDados?.extensao;
  }
  formatarVideoNome(objeto: any) {
    if (objeto?.arquivoDados?.nome == '' || !objeto?.arquivoDados?.nome)
      return 'Nenhum vídeo selecionado';
    return objeto?.arquivoDados?.nome + '.' + objeto?.arquivoDados?.extensao;
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
    novoContent.name = '';
    secao.contents.push(novoContent);
  }
  excluirItem(indiceSecao: number, indice: number) {
    this.dialogService
      .genericoDialog(
        'Confirmação',
        'Tem certeza que deseja excluir este item?'
      )
      .afterClosed()
      .subscribe((response) => {
        if (response) this.contents[indiceSecao].contents.splice(indice, 1);
      });
  }

  excluirContent(secao: any) {
    this.dialogService
      .genericoDialog(
        'Confirmação',
        'Tem certeza que deseja excluir esta seção?'
      )
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.indicesAbertos = [];
          const indice = this.contents.findIndex((e: any) => e.id == secao.id);
          this.contents.splice(indice, 1);
        }
      });
  }

  selecionarIndice(indice: number) {
    this.indicesAbertos.includes(indice)
      ? this.indicesAbertos.splice(
          this.indicesAbertos.findIndex((i) => i == indice),
          1
        )
      : this.indicesAbertos.push(indice);
  }
  estaSelecionado(indice: number) {
    return this.indicesAbertos.includes(indice);
  }

  gerarListaType() {
    const retorno: string[] = [];
    if (this.enfermagem) retorno.push('1');
    if (this.medicina) retorno.push('2');
    if (this.dentista) retorno.push('3');
    if (this.criogenesis) retorno.push('0');
    if (this.outros) retorno.push('4');
    return retorno;
  }

  setarType() {
    if (this.curso?.types?.includes(1)) this.enfermagem = true;
    if (this.curso?.types?.includes(2)) this.medicina = true;
    if (this.curso?.types?.includes(3)) this.dentista = true;
    if (this.curso?.types?.includes(0)) this.criogenesis = true;
    if (this.curso?.types?.includes(4)) this.outros = true;
  }

  salvar(model: NgModel) {
    if (!this.saveLoading && !model.hasError('mask')) {
      this.saveLoading = true;
      this.curso.workload = this.converterParaCargaHoraria(this.cargaHoraria);
      this.curso.topics = this.topics.map((e) => e.value);
      this.curso.topics.splice(this.topics.length - 1, 1);
      this.curso.types = this.gerarListaType();
      this.curso.visible = this.visivel ? '1' : '0';
      this.cursoService.courseSetAdmin(this.curso, this.courseId).subscribe(
        (response) => {
          this.cargaHoraria = this.converterParaHoraMinutos(
            this.curso.workload
          );
          this.saveLoading = false;
          this.toastrService.success(
            'Informações salvas com sucesso!',
            'Sucesso'
          );
        },
        (_) => {
          this.toastrService.error(
            'Ocorreu algum erro ao tentar salvar o curso, por favor entre em contato com o suporte!',
            'Falha ao salvar curso'
          );
          this.saveLoading = false;
        }
      );
    }
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.contagem == 0;
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
  }

  contagem = 0;
  salvarContents() {
    if (!this.saveContentLoading) {
      this.curso.contents = this.contents;
      this.saveContentLoading = true;
      this.cursoService
        .courseContentsAdmin(this.courseId, this.curso.contents)
        .subscribe(
          (response) => {
            this.contents.forEach((e: any) => {
              e.contents.forEach((e: any) => {
                this.contagem++;
                if (e.type != 'test' && e.arquivoDados) {
                  this.cursoService
                    .courseContentsFileAdmin(e.arquivoDados.arquivo, e.id)
                    .subscribe((response) => {
                      this.contagem--;
                      if (this.contagem == 0) {
                        this.carregarCurso();
                        this.toastrService.success(
                          'Sucesso ao salvar as seções!',
                          'Sucesso'
                        );
                        this.saveContentLoading = false;
                      }
                    });
                } else {
                  this.contagem--;
                }
              });
            });
            if (this.contagem == 0) {
              this.carregarCurso();
              this.saveContentLoading = false;
              this.toastrService.success(
                'Sucesso ao salvar as seções!',
                'Sucesso'
              );
            }
          },
          (_) => {
            this.toastrService.error(
              'Ocorreu algum erro ao tentar salvar seções, por favor entre em contato com o suporte!',
              'Falha ao salvar seções'
            );
            this.saveContentLoading = false;
            this.contagem = 0;
          }
        );
    }
  }
}
