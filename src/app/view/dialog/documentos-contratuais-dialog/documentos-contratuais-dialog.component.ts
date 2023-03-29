import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DocumentoService } from 'src/app/service/documento.service';

@Component({
  selector: 'documentos-contratuais-dialog',
  templateUrl: './documentos-contratuais-dialog.component.html',
  styleUrls: ['./documentos-contratuais-dialog.component.css']
})
export class DocumentosContratuaisDialogComponent implements OnInit {

  documento:any = {} as any;
  documentoArquivo:any;

  isLoading:boolean = false;

  dentista: boolean = false;
  medicina: boolean = false;
  enfermagem: boolean = false;
  criogenesis: boolean = false;
  outros: boolean = false;

  constructor(private toastrService:ToastrService, private documentoService:DocumentoService, private dialogRef:MatDialogRef<DocumentosContratuaisDialogComponent>) { }

  ngOnInit(): void {
  }

  receberRetorno(e: any) {
    return e
  }

  gerenciarFileInput(event: any) {
    let arquivo: File | null = event.files.item(0);
    if (arquivo) {
      if (arquivo.type.split('/')[1] != 'png' && arquivo.type.split('/')[1] != 'jpg' && arquivo.type.split('/')[1] != 'jpeg' && arquivo.type.split('/')[1] != 'pdf') {
        this.toastrService.error('Formato do arquivo não é compatível! Por favor, anexar nos formatos: PDF, PNG, JPG ou JPEG', 'Erro ao anexar arquivo');
      }
      else {
        this.documentoArquivo = arquivo;
      }

    }
  }

  gerarListaType() {
    const retorno: number[] = [];
    if (this.enfermagem)
      retorno.push(1);
    if (this.medicina)
      retorno.push(2);
    if (this.dentista)
      retorno.push(3);
    if (this.criogenesis)
      retorno.push(0);
    if (this.outros)
      retorno.push(4);
    return retorno;
  }

  salvar(form:NgForm){
    if(!this.isLoading){
      this.isLoading = true;
      this.documento.types = this.gerarListaType();
      if(form.valid && this.documentoArquivo && this.documento.types.length > 0){
        this.documentoService.downloadsAddAdmin(this.documento, this.documentoArquivo).subscribe((response)=>{
          this.isLoading = false;
          this.dialogRef.close(true)
        }, (error:HttpErrorResponse)=>{
          if(error.status != 200){
            this.toastrService.error('Aconteceu algum erro inesperado, por favor entre em contato com suporte!', 'Ocorreu algum erro');
          }
          this.isLoading = false;
          this.dialogRef.close(true)
        })
      }
    }
  }

  formatarArquivoNome(documentoArquivo: any) {
    if (documentoArquivo?.name.trim() == '' || !documentoArquivo)
      return 'Nenhum documento selecionado';
    return documentoArquivo.name;
  }
}
