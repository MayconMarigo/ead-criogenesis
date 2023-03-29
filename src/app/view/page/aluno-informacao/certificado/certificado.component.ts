import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/app/service/aluno.service';

@Component({
  selector: 'certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {

  listaCertificados = [] as any;

  constructor(private alunoService: AlunoService) { }

  ngOnInit(): void {
    this.carregarCertificados();
  }

  carregarCertificados() {
    this.alunoService.certificates().subscribe((response) => {
      this.listaCertificados = response;
    });
  }

  downloadArquivo(url: string, indice: number) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', url);
    link.setAttribute('download', 'DeclaraçãoDeParticipaçãoCriogenesisEad.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

}
