import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EstadosEnum } from 'src/app/model/enums/estados-enum';
import { ToolsUtils } from 'src/app/model/tools';
import { DialogService } from 'src/app/service/dialog.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Router } from '@angular/router';
import { CursoService } from 'src/app/service/curso.service';
import { DocumentoService } from 'src/app/service/documento.service';

@Component({
  selector: 'todos-usuarios',
  templateUrl: './todos-usuarios.component.html',
  styleUrls: ['./todos-usuarios.component.css'],
})
export class TodosUsuariosComponent extends ToolsUtils implements OnInit {
  listaUsuarios = [] as any;
  listaUsuariosFiltrados = [] as any;
  listaExpandido: number[] = [];
  listaEstados = [];
  listaPorClasse = [] as any;
  listaReserva = [] as any;
  isAdmin: boolean = false;
  cursos: any = [] as any;
  newUser: any = [];
  docs: boolean = false;

  loadingList = [] as any;
  documento: any | undefined = 0;
  documentos: any = [] as any;
  documentosExpandidosIndices: number[] = [] as number[];

  constructor(
    private usuarioService: UsuarioService,
    private cursoService: CursoService,
    private dialogService: DialogService,
    private toastrService: ToastrService,
    private documentoService: DocumentoService,
    private router: Router
  ) {
    super();
    const pathSplitted = this.router.url.split('/');
    this.isAdmin = pathSplitted[1] == 'admin';
  }

  ngOnInit(): void {
    this.listaEstados = JSON.parse(JSON.stringify(EstadosEnum.estados));
    this.carregarUsuarios();
    this.carregarDocumentos();
  }

  expandirDocumento(indice: number) {
    return (
      this.documentosExpandidosIndices.filter((e) => e == indice).length > 0
    );
  }

  formatarArquivoNome(nome: string, extensao: string) {
    if (nome == '' || !nome) return 'Nenhum documento selecionado';
    return nome + '.' + extensao;
  }

  selecionarDocumentoReprovado(documento: any, indice: number) {
    if (
      (documento.status == '2' || documento.status == null) &&
      !documento.bloquear
    ) {
      if (!this.documentosExpandidosIndices.includes(indice)) {
        this.documentosExpandidosIndices.push(indice);
      } else {
        this.resetarDocumentoExpandido(indice);
      }
    }
  }
  iconStatus(valor: string) {
    if (valor == '1') {
      return 'check-circle';
    } else if (valor == '2') {
      return 'times-circle';
    } else if (valor == '0') {
      return 'question-circle';
    }
    return 'circle';
  }
  textoStatus(valor: string) {
    if (valor == '1') {
      return 'Aprovado';
    } else if (valor == '2') {
      return 'Recusado';
    } else if (valor == '0') {
      return 'Em Análise';
    }
    return 'Não Enviado';
  }

  gerenciarFileInput(event: any, documento: any) {
    let arquivo: File | null = event.files.item(0);
    const type = arquivo?.type.split('/')[1];
    if (type == 'png' || type == 'jpeg' || type == 'pdf') {
      documento.arquivo = arquivo;
      this.documento = arquivo;
      documento.arquivoNome = arquivo?.name.split('.')[0];
      documento.extensao = arquivo?.type.split('/')[1];
    }
  }

  uploadDocumento(documento: any, indice: number, user: any) {
    if (documento.arquivo) {
      this.loadingList.push(indice);
      const indiceSplice = this.loadingList.findIndex((e: any) => e == indice);
      this.documentoService
        .uploadDocumentAdmin(this.documento, documento.id, user, true)
        .subscribe(
          (response) => {
            this.loadingList.splice(indiceSplice, 1);
            this.resetarDocumentoExpandido(indice);
            this.carregarDocumentos();
          },
          (error) => {
            this.toastrService.error(
              'Houve algum problema ao inserir o arquivo! Por favor, tente novamente!',
              'Erro'
            );
            this.loadingList.splice(indiceSplice, 1);
          }
        );
    }
  }

  showDocs() {
    this.docs = !this.docs;
  }

  carregarDocumentos() {
    this.documentoService.documentsGetAdmin().subscribe((response: any) => {
      this.documentos = response;
      this.documentos.sort((a: any, b: any) => a.id - b.id);
      this.documentos.forEach((e1: any) => {
        if (e1.status == 0) {
          let id = this.documentos.findIndex(
            (e2: any) => e2.status == 2 && e2.id == e1.id
          );
          if (id >= 0) this.documentos[id].bloquear = true;
        }
      });
    });
  }

  resetarDocumentoExpandido(indice: number) {
    const indiceRemover = this.documentosExpandidosIndices.findIndex(
      (e) => e == indice
    );
    this.documentosExpandidosIndices.splice(indiceRemover, 1);
    this.documento = undefined;
    // this.documentoExpandidoIndice = undefined;
  }

  isLoading(indice: any) {
    return this.loadingList.includes(indice);
  }

  removerDisabledDosInputs() {
    if (!this.isAdmin) return;

    let inputs = document.getElementsByClassName('input');
    Object.values(inputs).forEach((v) => v?.removeAttribute('disabled'));
  }

  setNewUser(index: any, user: any, type: string, event: any) {
    this.newUser = user;
    delete this.newUser.agree;
    delete this.newUser.cursos;
    delete this.newUser.documents;
    delete this.newUser.payments;
    this.newUser[type] = type == 'registryType' ? event : event?.target?.value;
  }

  updateUser() {
    if (this.newUser.length == 0)
      return alert(
        'É preciso editar algum usuário antes de salvar as alterações!'
      );
    if (
      this.newUser.name == '' ||
      this.newUser.email == '' ||
      this.newUser.registryType == '' ||
      this.newUser.registry == '' ||
      this.newUser.address == ''
    )
      return alert(
        'Os campos Nome, Email, Registro de Classe, Número de Registro ou Endereço não podem estar vazios!'
      );

    let c = confirm(
      'Confirmar que você está realizando alterações no usuário ' +
        this.newUser.name +
        '?'
    );
    if (c) {
      this.usuarioService
        .adminUpdateUser(this.newUser)
        .subscribe((res: any) => {
          alert('Alterações realizadas com sucesso!');
          window.location.reload();
        });
    }
  }

  carregarUsuarios() {
    this.usuarioService.users().subscribe((response: any) => {
      this.listaUsuarios = response;

      this.cursoService.courseAdmin('1').subscribe((response: any) => {
        this.cursos = response.users;

        for (let i = 0; i < this.cursos.length; i++) {
          for (let j = 0; j < this.listaUsuarios.length; j++) {
            if (
              this.listaUsuarios[j]?.name.toLowerCase() ==
              this.cursos[i]?.name.toLowerCase()
            ) {
              this.listaUsuarios[j].cursos = [
                { name: response?.name, qnt: this.cursos[i].qnt },
              ];
              continue;
            }
          }
        }
      });

      this.cursoService.courseAdmin('6').subscribe((response: any) => {
        this.cursos = response.users;

        for (let i = 0; i < this.cursos.length; i++) {
          for (let j = 0; j < this.listaUsuarios.length; j++) {
            if (
              this.listaUsuarios[j]?.name.toLowerCase() ==
              this.cursos[i]?.name.toLowerCase()
            ) {
              this.listaUsuarios[j].cursos?.push({
                name: response?.name,
                qnt: this.cursos[i].qnt,
              });
              continue;
            }
          }
        }
      });
      // console.log(this.listaUsuarios);
    });
  }

  filtrarUsuarios(e: any) {
    return (this.listaUsuariosFiltrados = this.listaUsuarios.filter(
      (usuario: any) =>
        usuario.name.toLowerCase().includes(e.target.value.toLowerCase())
    ));
  }

  ordenarUsuariosPorClasse(e: any) {
    if (e.target.value === 0) return this.carregarUsuarios();

    this.listaUsuarios.filter((u: any) => {
      if (u.registryType == e.target.value) {
        return this.listaPorClasse.push(u);
      }
      this.listaReserva.push(u);
    });

    this.listaUsuarios = [...this.listaPorClasse, ...this.listaReserva];
    this.listaPorClasse = [];
    this.listaReserva = [];
    return this.listaUsuarios;
  }

  formatarEstado(sigla: string) {
    const estado: any = this.listaEstados.find((e: any) => e.sigla == sigla);
    return estado ? estado.nome : '';
  }

  selecionarUsuario(indice: number) {
    if (!this.listaExpandido.includes(indice)) {
      this.listaExpandido.push(indice);
    } else {
      const indiceRemover = this.listaExpandido.findIndex((e) => e == indice);
      this.listaExpandido.splice(indiceRemover, 1);
    }
  }

  expandirUsuario(indice: number) {
    this.removerDisabledDosInputs();
    return this.listaExpandido.filter((e) => e == indice).length > 0;
  }

  deletarUsuario(usuario: any, indice: number) {
    this.dialogService
      .genericoDialog(
        'Confirmação',
        'Deseja realmente excluir este usuário? Está ação não pode ser desfeita!'
      )
      .afterClosed()
      .subscribe((response) => {
        if (response)
          this.usuarioService.deleteUser(usuario.id).subscribe(
            (response) => {
              if (this.listaExpandido.includes(indice))
                this.selecionarUsuario(indice);
              this.carregarUsuarios();
            },
            (_) => {
              this.toastrService.error(
                'Houve algum erro ao excluir usuário, por favor entre em contato com o suporte!',
                'Error'
              );
            }
          );
      });
  }

  visualizarImagem(documento: any) {
    if (documento.status != null)
      if (documento.extension == 'pdf') {
        this.dialogService
          .visualizarPdfDialog(documento.url)
          .afterClosed()
          .subscribe((response) => {});
      } else {
        this.dialogService
          .visualizarImagemDialog(documento.url)
          .afterClosed()
          .subscribe((response) => {
            if (response) {
              this.toastrService.error(
                'Houve algum problema ao carregar a imagem, peça para o aluno reenviar!',
                'Imagem corrompida!'
              );
            }
          });
      }
  }
  formartarStatus(status: string) {
    if (status == '0') return 'Pendente';
    if (status == '1') return 'Aprovado';
    if (status == '2') return 'Recusado';
    return 'Pendência de documento';
  }
}
