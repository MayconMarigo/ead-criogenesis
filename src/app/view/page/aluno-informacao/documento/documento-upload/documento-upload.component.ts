import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'documento-upload',
  templateUrl: './documento-upload.component.html',
  styleUrls: ['./documento-upload.component.css']
})
export class DocumentoUploadComponent implements OnInit {
  documentos: any = [
    {
      id: 1, nome: 'Registro de Classe', arquivo: '', arquivoNome: '', extensao: ''
    },
    {
      id: 2, nome: 'Comprovante de Residência', arquivo: '', arquivoNome: '', extensao: ''
    },
    {
      id: 3, nome: 'Diploma de Graduação', arquivo: '', arquivoNome: '', extensao: ''
    },
    {
      id: 4, nome: 'ANVISA', arquivo: '', arquivoNome: '', extensao: ''
    },
    {
      id: 5, nome: 'Protocolo da Vigilância Sanitária', arquivo: '', arquivoNome: '', extensao: ''
    },
    {
      id: 6, nome: 'RG', arquivo: '', arquivoNome: '', extensao: ''
    },
    {
      id: 7, nome: 'CPF', arquivo: '', arquivoNome: '', extensao: ''
    },
    {
      id: 8, nome: 'CNPJ', arquivo: '', arquivoNome: '', extensao: ''
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

  formatarArquivoNome(nome: string, extensao: string) {
    if (nome == '' || !nome)
      return 'Nenhum documento selecionado';
    return nome + '.' + extensao;
  }

  gerenciarFileInput(event: any, documento: any) {
    let arquivo: File | null = event.files.item(0);
    if (arquivo?.type.split('/')[0] == 'image') {
      documento.arquivo = arquivo;
      documento.arquivoNome = arquivo?.name.split('.')[0];
      documento.extensao = arquivo?.type.split('/')[1];
    }
  }

}
