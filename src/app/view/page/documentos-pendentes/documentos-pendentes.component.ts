import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/service/dialog.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'documentos-pendentes',
  templateUrl: './documentos-pendentes.component.html',
  styleUrls: ['./documentos-pendentes.component.css']
})
export class DocumentosPendentesComponent implements OnInit {

  listaAlunos = [] as any;
  listaExpandido: number[] = [];

  constructor(private usuarioService: UsuarioService, private dialogService: DialogService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.carregarAlunos()
  }

  carregarAlunos() {
    this.usuarioService.usersDocuments().subscribe((response: any) => {
      this.listaAlunos = response;
    })
  }

  selecionarAluno(indice: number) {
    if (!this.listaExpandido.includes(indice)) {
      this.listaExpandido.push(indice);
    } else {
      const indiceRemover = this.listaExpandido.findIndex(e => e == indice);
      this.listaExpandido.splice(indiceRemover, 1);
    }
  }

  expandirUsuario(indice: number) {
    return this.listaExpandido.filter(e => e == indice).length > 0;
  }

  recusarDocumento(documentoUrl: string) {
    const documentoUrlSplitted: string[] = documentoUrl.split('/');
    const documentoId = documentoUrlSplitted[documentoUrlSplitted.length - 1];
    this.dialogService.justificativaDialog().afterClosed().subscribe((response) => {
      if (response) {
        this.usuarioService.userDocumentApprove(documentoId, '2', response).subscribe((response) => {
          this.carregarAlunos();
        });
      }
    })
  }

  visualizarImagem(documento: any) {
    if (documento.status != null)
      if (documento.extension == 'pdf') {
        this.dialogService.visualizarPdfDialog(documento.url).afterClosed().subscribe((response) => { })
      } else {
        this.dialogService.visualizarImagemDialog(documento.url).afterClosed().subscribe((response) => {
          if (response) {
            this.toastrService.error('Houve algum problema ao carregar a imagem, peça para o aluno reenviar!', 'Imagem corrompida!');
          }
        })
      }
  }

  existePendente(documentos:[]){
    return documentos.filter((e:any)=>e.status == 0).length > 0
  }

  aprovarDocumento(documentoUrl: string) {
    const documentoUrlSplitted: string[] = documentoUrl.split('/');
    const documentoId = documentoUrlSplitted[documentoUrlSplitted.length - 1];
    this.usuarioService.userDocumentApprove(documentoId, '1', null).subscribe((response) => {
      this.carregarAlunos();
    });
  }

  aprovarAluno(alunoId: string) {
    this.dialogService.genericoDialog('Confirmação', 'Deseja aprovar este aluno?').afterClosed().subscribe((response) => {
      if (response)
        this.usuarioService.userApproveById(alunoId).subscribe((response) => {
          this.carregarAlunos();
        })
    })
  }

  formartarStatus(status: string) {
    if (status == '0')
      return 'Pendente';
    if (status == '1')
      return 'Aprovado';
    if (status == '2')
      return 'Recusado';
    return 'Pendência de documento';
  }
}
