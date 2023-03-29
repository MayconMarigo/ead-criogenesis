import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { MarketingService } from 'src/app/service/marketing.service';

@Component({
  selector: 'marketing-list',
  templateUrl: './marketing-list.component.html',
  styleUrls: ['./marketing-list.component.css']
})
export class MarketingListComponent implements OnInit {

  marketings = [] as any;

  isAdmin: boolean = false;
  isRotaAluno: boolean = false;

  constructor(private marketingService: MarketingService, private toastrService: ToastrService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isRotaAluno = this.router.url.split('/')[1] == 'aluno';
    if (!this.isRotaAluno)
      this.isAdmin = this.authService.isAutenticado(true);
    this.carregarLista();
  }

  carregarLista() {
    if (this.isAdmin) {
      this.marketingService.getMarketingAdmin().subscribe((response) => {
        this.marketings = response;
      })
    } else {
      this.marketingService.getMarketing().subscribe((response) => {
        this.marketings = response;
      })
    }
  }

  copiarInput(titulo:any, texto: any) {
    const elem = document.createElement('textarea');
    elem.value = titulo;
    if(!(texto.trim() == '')){
      elem.value += '\n';
      elem.value += '\n';
      elem.value += texto;
    }
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
    this.toastrService.info('Texto copiado');
  }

  downloadImg(marketing: any) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", marketing.image, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(this.response);
      var tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = marketing.title;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    }
    xhr.send();
  }

  editar(id: string) {
    this.router.navigateByUrl('/admin/marketing/set/' + id);
  }

  excluir(id: string) {
    this.marketingService.deleteMarketing(id).subscribe((response) => {
      this.carregarLista();
      this.toastrService.success('Marketing excluido com sucesso', 'Sucesso');
    });
  }
}
