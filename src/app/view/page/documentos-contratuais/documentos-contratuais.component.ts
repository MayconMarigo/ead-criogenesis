import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { DialogService } from 'src/app/service/dialog.service';
import { DocumentoService } from 'src/app/service/documento.service';

@Component({
  selector: 'documentos-contratuais',
  templateUrl: './documentos-contratuais.component.html',
  styleUrls: ['./documentos-contratuais.component.css']
})
export class DocumentosContratuaisComponent implements OnInit {
  documentos = [] as any;

  isAdmin: boolean = false;
  isRotaAluno: boolean = false;

  constructor(private documentoService: DocumentoService, private authService: AuthService, private router: Router, private toastrService: ToastrService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.isRotaAluno = this.router.url.split('/')[1] == 'aluno';
    if (!this.isRotaAluno)
      this.isAdmin = this.authService.isAutenticado(true);
    this.carregarDocumentos();
  }

  carregarDocumentos() {
    if (this.isRotaAluno){
      this.documentoService.downloads().subscribe((response) => {
        this.documentos = response;
      })
    } else {
      this.documentoService.downloadsAdmin().subscribe((response) => {
        this.documentos = response;
      })
    }
  }

  existeType(types: string, typeComparar: number) {
    const typesParse: any[] = JSON.parse(types) as any[];
    return typesParse.includes(typeComparar);
  }

  excluir(documentoId: string) {
    this.dialogService.genericoDialog('Confirmação', 'Deseja excluir este documento?').afterClosed().subscribe((response) => {
      if (response)
        this.documentoService.downloadsDeleteAdmin(documentoId).subscribe((response) => {
          this.toastrService.success('Documento excluído com sucesso', 'Sucesso');
          this.carregarDocumentos();
        })
    })
  }

  downloadImg(documento: any) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", documento.url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(this.response);
      var tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = documento.name;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    }
    xhr.send();
  }

  criarDocumentoContratual(){
    this.dialogService.criarDocumentoContratualDialog().afterClosed().subscribe((response)=>{
      this.carregarDocumentos();
    });
  }
}
