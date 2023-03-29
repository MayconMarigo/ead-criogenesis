import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DocumentoService } from 'src/app/service/documento.service';

@Component({
  selector: 'documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {

  loadingList = [] as any;
  documentos: any = [] as any;

  documentoExpandido: any = null;
  documento: any | undefined = 0;

  documentoExpandidoIndice: number | undefined;
  documentosExpandidosIndices: number[] = [] as number[];

  constructor(private documentoService: DocumentoService, private toastrService:ToastrService) { }

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
          if (id >= 0)
            this.documentos[id].bloquear = true;
        }
      })
    });
  }

  uploadDocumento(documento: any, indice: number) {
    if(documento.arquivo){
      this.loadingList.push(indice);
      const indiceSplice = this.loadingList.findIndex((e:any) => e == indice);
      this.documentoService.uploadDocument(this.documento, documento.id).subscribe((response) => {
        this.loadingList.splice(indiceSplice, 1);
        this.resetarDocumentoExpandido(indice);
        this.carregarDocumentos();
      },(error)=>{
        this.toastrService.error('Houve algum problema ao inserir o arquivo! Por favor, tente novamente!', 'Erro');
        this.loadingList.splice(indiceSplice, 1);
      })
    }
  }

  isLoading(indice:any){
    return this.loadingList.includes(indice);
  }

  expandirDocumento(indice: number) {
    return this.documentosExpandidosIndices.filter(e => e == indice).length > 0;
  }

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
