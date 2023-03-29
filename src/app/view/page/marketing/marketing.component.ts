import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MarketingService } from 'src/app/service/marketing.service';

@Component({
  selector: 'marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css'],
})
export class MarketingComponent implements OnInit {
  id: any = undefined;
  marketing = {} as any;
  marketingImagem: any = null;
  imgUrl: any = null;
  video = {} as any;
  loading: boolean = false;
  alteracao: boolean = false;

  mouseover: boolean = false;

  dentista: boolean = false;
  medicina: boolean = false;
  enfermagem: boolean = false;
  criogenesis: boolean = false;
  outros: boolean = false;

  constructor(
    private marketingService: MarketingService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.alteracao = true;
      this.carregarMarketing();
    }
  }

  gerarListaType() {
    const retorno: string[] = [];
    if (this.enfermagem) retorno.push('1');
    if (this.medicina) retorno.push('2');
    if (this.dentista) retorno.push('3');
    if (this.criogenesis) retorno.push('0');
    if (this.outros) retorno.push('4');
    return retorno;
  }

  setarType() {
    if (this.marketing?.types?.includes(1)) this.enfermagem = true;
    if (this.marketing?.types?.includes(2)) this.medicina = true;
    if (this.marketing?.types?.includes(3)) this.dentista = true;
    if (this.marketing?.types?.includes(0)) this.criogenesis = true;
    if (this.marketing?.types?.includes(4)) this.outros = true;
  }

  receberRetorno(e: any) {
    return e;
  }

  carregarMarketing() {
    this.marketingService.getMarketingById(this.id).subscribe((response) => {
      this.marketing = response;
      this.setarType();
    });
  }

  gerenciarFileInput(event: any) {
    let arquivo: File | null = event.files.item(0);
    if (arquivo) {
      if (
        arquivo.type.split('/')[1] != 'png' &&
        arquivo.type.split('/')[1] != 'jpg' &&
        arquivo.type.split('/')[1] != 'jpeg'
      ) {
        this.toastrService.error(
          'Formato do arquivo não é compatível! Por favor, anexar nos formatos: PNG, JPG ou JPEG',
          'Erro ao anexar imagem'
        );
      }
      // else if (arquivo.size > 10485760) {
      //   this.toastrService.error('Imagem muito grande! Tamanho máximo: 10 mb', 'Erro ao anexar imagem');
      // }
      else {
        this.marketingImagem = arquivo;
        this.toastrService.info(
          'Salve os dados para concluir a operação',
          'Imagem anexada'
        );
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.imgUrl = event.target.result;
        };

        reader.onerror = (event: any) => {
          // console.log("File could not be read: " + event.target.error.code);
        };

        reader.readAsDataURL(event.files[0]);
      }
    }
  }

  salvar() {
    if (!this.loading) {
      this.loading = true;
      this.marketing.types = this.gerarListaType();
      if (this.id) {
        this.marketingService
          .setMarketing(this.marketing.id, this.marketing)
          .subscribe(
            (response) => {
              this.router.navigateByUrl('/admin/marketing');
            },
            (_) => {
              this.toastrService.error(
                'Erro ao salvar o marketing, por favor entre em contato com o suporte',
                'Ocorreu algum erro!'
              );
              this.loading = false;
            }
          );
      } else {
        this.marketingService
          .addMarketing(this.marketing, this.marketingImagem)
          .subscribe(
            (response) => {
              this.router.navigateByUrl('/admin/marketing');
            },
            (_) => {
              this.toastrService.error(
                'Erro ao salvar o marketing, por favor entre em contato com o suporte',
                'Ocorreu algum erro!'
              );
              this.loading = false;
            }
          );
      }
    }
  }

  copiarInput(titulo: any, texto: any) {
    const elem = document.createElement('textarea');
    elem.value = titulo;
    if (!(texto.trim() == '')) {
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
}
