import { Component, Input, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EstadosEnum } from 'src/app/model/enums/estados-enum';
import { Cidades } from '../../../../../../src/app/model/enums/cidades-enums';
import { ToolsUtils } from 'src/app/model/tools';
import { AlunoService } from 'src/app/service/aluno.service';
import { AuthService } from 'src/app/service/auth.service';
import { DialogService } from 'src/app/service/dialog.service';
import { LoginService } from 'src/app/service/login.service';
import { CursoService } from 'src/app/service/curso.service';

@Component({
  selector: 'login-cadastro',
  templateUrl: './login-cadastro.component.html',
  styleUrls: ['./login-cadastro.component.css'],
})
export class LoginCadastroComponent extends ToolsUtils implements OnInit {
  usuario = {} as any;
  listaEstados: any = null;
  listaEstadosFiltradas: any = null;
  listaCidades: any = [];
  listaCidadesFiltradas: any = null;
  senhaForca: number = 0;
  emailError401: boolean = false;
  spinnerLoad: boolean = false;
  cursosParaRegistro = [] as any;

  leiProtecaoDados: boolean = false;
  informarPdpTdu: boolean = false;
  receberInformacoesTerapiaCelular: boolean = false;

  constructor(
    private loginService: LoginService,
    private dialogService: DialogService,
    private router: Router,
    private toastrService: ToastrService,
    private authService: AuthService,
    private alunoService: AlunoService,
    private cursoService: CursoService
  ) {
    super();
  }

  ngOnInit(): void {
    this.listaEstados = JSON.parse(JSON.stringify(EstadosEnum.estados));
    this.listaEstadosFiltradas = this.listaEstados;
    this.listaCidades = Cidades[0]?.cidades;
  }

  triggerEvent(e: any, input: any) {
    if (!e) {
      input.value = '';
      this.filtrarEstado(input);
    }
  }

  filtrarEstado(filtro: any) {
    const valor: string = filtro.value;
    this.listaEstadosFiltradas = this.listaEstados.filter((e: any) =>
      this.removerAcentos(e.nome)
        .toLowerCase()
        .includes(this.removerAcentos(valor).toLowerCase())
    );
  }

  filtrarCidade(filtro: any) {
    const valor: string = filtro.value;
    this.listaCidadesFiltradas = this.listaCidades.filter((e: any) =>
      e.toLowerCase().includes(valor)
    );
  }

  selecionarEstado(event: any) {
    this.listaCidades = Cidades.filter((c: any) => {
      if (c.sigla == event.value) return c.cidades;
    });
    this.listaCidades = this.listaCidades[0].cidades;
  }

  selecionarCidade(event: any) {
    this.usuario.cidade = event.value;
  }

  filtrarCidadePorEstado(filtro: any) {
    const valor: string = filtro.value;
    this.listaCidadesFiltradas = this.listaCidades.filter((e: any) =>
      this.removerAcentos(e.nome)
        .toLowerCase()
        .includes(this.removerAcentos(valor).toLowerCase())
    );
  }

  cadastrar(form: NgForm) {
    // if (form.controls['email2'].hasError('emailInvalido') && (form.controls['email2'].value == null || form.controls['email2'].value.trim() == '')) {
    //   form.controls['email2'].setErrors(null);
    // }

    if (
      form.valid &&
      this.usuario.registryType != undefined &&
      this.leiProtecaoDados &&
      this.informarPdpTdu
    ) {
      this.spinnerLoad = true;
      this.usuario.agree = this.receberInformacoesTerapiaCelular;
      this.loginService.register(this.usuario).subscribe(
        (response) => {
          this.spinnerLoad = false;
          // this.dialogService.genericoDialog('Cadastro concluído', 'Cadastro feito com sucesso, aguarde a aprovação para entrar no sistema.', true).afterClosed().subscribe((response) => {
          //   this.router.navigateByUrl('');
          // })

          this.authService.setUser(response);
          this.alunoService.setUser(response);

          this.cursoService.allCoursesAdmin().subscribe((courses) => {
            Object.values(courses).map((c) => {
              if (c.types.includes(this.usuario.registryType)) {
                this.cursosParaRegistro.push(Number(c.id));
              }
            });
            this.cursoService
              .setOngoingCoursesOnRegister(
                this.usuario.email,
                this.cursosParaRegistro
              )
              .subscribe((res) => {
                //
              });
          });

          this.router.navigate(['']);
        },
        (error) => {
          this.spinnerLoad = false;
          // console.log(error);
          if (error.status == 401) {
            form.controls['email'].setErrors({ emailExiste: true });
          }
        }
      );
      this.cursosParaRegistro = [];
    } else {
      this.toastrService.warning(
        'Preencha os campos corretamente!',
        'Campos inválidos'
      );
    }
  }

  receberRetorno(e: any) {
    return e;
  }

  verificarForcaSenha(e: any) {
    const letraMinusculo = new RegExp('(?=.*[a-z])');
    const letraMaiusculo = new RegExp('(?=.*[A-Z])');
    const digito = new RegExp('(?=.*[0-9])');
    const caracterEspecial = new RegExp('(?=.*[^A-Za-z0-9])');
    const tamanho8 = new RegExp('(?=.{8,})');
    this.senhaForca = 0;
    const senha: string = e.target.value;
    if (letraMinusculo.test(senha)) this.senhaForca++;
    if (letraMaiusculo.test(senha)) this.senhaForca++;
    if (digito.test(senha)) this.senhaForca++;
    if (caracterEspecial.test(senha)) this.senhaForca++;
    if (tamanho8.test(senha)) this.senhaForca++;
  }

  medidorDeForca(valor: number) {
    if (valor >= 5) return 'Muito Forte';
    if (valor == 4) return 'Forte';
    if (valor == 3 || valor == 2) return 'Médio';
    return 'Fraco';
  }

  setSenhasDiferentes(e: NgModel) {
    if (e.dirty) {
      if (this.usuario.password == this.usuario.confirmPassword)
        e.control.setErrors(null);
      else e.control.setErrors({ senhasDiferentes: true });
    }
  }

  validarEmail(email: NgModel) {
    const re = /\S+@\S+\.\S+/;
    const resultado = re.test(email.control.value);
    if (!resultado) {
      email.control.setErrors({ emailInvalido: true });
      return false;
    }
    email.control.setErrors(null);
    return true;
  }
}
