import { Component, OnInit } from '@angular/core';
import { DocumentoService } from 'src/app/service/documento.service';

@Component({
  selector: 'documento-status',
  templateUrl: './documento-status.component.html',
  styleUrls: ['./documento-status.component.css']
})
export class DocumentoStatusComponent implements OnInit {
  documentos: any = [] as any;

  documentoExpandido: any = null;
  documento: any | undefined = 0;

  documentoExpandidoIndice: number | undefined;
  documentosExpandidosIndices: number[] = [] as number[];

  constructor(private documentoService: DocumentoService) { }

  ngOnInit(): void {
    this.carregarDocumentos();
  }

  carregarDocumentos() {
    this.documentoService.documents().subscribe((response: any) => {
      this.documentos = response;
      this.documentos.sort((a: any, b: any) => a.id - b.id)
      this.documentos.forEach((e1: any) => {
        if (e1.status == 0) {
          let id = this.documentos.findIndex((e2: any) => e2.status == 2 && e2.id == e1.id);
          if (id)
            this.documentos[id].bloquear = true;
        }
      })
    });
  }

  uploadDocumento(documento: any, indice: number) {
    this.documentoService.uploadDocument(this.documento, documento.id).subscribe((response) => {
      this.resetarDocumentoExpandido(indice);
      this.carregarDocumentos();
    })
  }

  expandirDocumento(indice: number) {
    return this.documentosExpandidosIndices.filter(e => e == indice).length > 0;
  }
  // expandirDocumento(indice:number){
  //   return this.documentoExpandidoIndice == indice;
  // }

  selecionarDocumentoReprovado(documento: any, indice: number) {
    if ((documento.status == '2'|| documento.status == null) && !documento.bloquear) {
      if (!this.documentosExpandidosIndices.includes(indice)) {
        this.documentosExpandidosIndices.push(indice);
      } else {
        this.resetarDocumentoExpandido(indice);
      }
    }
  }

  resetarDocumentoExpandido(indice: number) {
    const indiceRemover = this.documentosExpandidosIndices.findIndex(e => e == indice);
    this.documentosExpandidosIndices.splice(indiceRemover, 1);
    this.documento = undefined;
    // this.documentoExpandidoIndice = undefined;
  }

  formatarDescricao(status: string) {
    if (status == "1")
      return "O documento encontra-se com status de aprovado.";
    if (status == "2")
      return "O documento encontra-se com status de reprovado, digitalização ilegível, para aprovação do seu cadastro envie o documento novamente.";
    if (status == "0")
      return "O documento encontra-se com status de pendência, aguarde mais um pouco.";
    return "";
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

  formatarArquivoNome(nome: string, extensao: string) {
    if (nome == '' || !nome)
      return 'Nenhum documento selecionado';
    return nome + '.' + extensao;
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
}
