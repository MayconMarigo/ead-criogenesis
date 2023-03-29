import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'documentos-pendentes-detalhe',
  templateUrl: './documentos-pendentes-detalhe.component.html',
  styleUrls: ['./documentos-pendentes-detalhe.component.css']
})
export class DocumentosPendentesDetalheComponent implements OnInit {

  listaDocumentos = [{ nome: 'Registro de Classe', status: 'Anexado' }, { nome: 'RG', status: 'Anexado' }, { nome: 'CRM/CRO/COREN', status: 'Anexado' },
  { nome: 'ANVISA', status: 'Anexado'}, { nome: 'Protocolo de Vigilância Sanitária', status: 'Sem Anexo'}, { nome: 'Comprovante de Residência', status: 'Anexado'},
  { nome: 'CNPJ', status: 'Sem Anexo'}, { nome: 'Certificado', status: 'Anexado'}, { nome: 'Especialização', status: 'Anexado'}]

  constructor(private dialog: DialogService) { }

  ngOnInit(): void {
  }

  abrirJustificativa(){
    this.dialog.justificativaDialog().afterClosed().subscribe((response)=>{
    })
  }
}
