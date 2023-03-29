import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { EstadosEnum } from 'src/app/model/enums/estados-enum';
import { LoginService } from 'src/app/service/login.service';
import { AuthService } from 'src/app/service/auth.service';
import { DialogService } from 'src/app/service/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { CursoService } from 'src/app/service/curso.service';
import { ToolsUtils } from 'src/app/model/tools';
import { AlunoService } from 'src/app/service/aluno.service';

@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent extends ToolsUtils implements OnInit {

  slideTime = 10;
  slideInterval: any;

  mouseover: boolean = false;

  usuario = {} as any;
  listaEstados: any = null;
  listaEstadosFiltradas: any = null;
  autenticado: boolean | undefined;

  spinnerLoad:boolean = false;

  senhaForca: number = 0;
  emailError401: boolean = false;

  leiProtecaoDados: boolean = false;
  informarPdpTdu: boolean = false;
  receberInformacoesTerapiaCelular: boolean = false;

  cursos = [] as any;

  constructor(private loginService: LoginService, private authService: AuthService, private dialogService: DialogService, private toastrService:ToastrService, private cursoService:CursoService, private alunoService: AlunoService) {
    super();
    this.autenticado = authService.isAutenticado();
  }

  ngOnInit(): void {
    this.listaEstados = JSON.parse(JSON.stringify(EstadosEnum.estados));
    this.listaEstadosFiltradas = this.listaEstados;
    this.carregarCursos();
    if(this.autenticado){
      this.loginService.checkLogin().subscribe((response) => {
        this.authService.setUser(response);
        this.alunoService.setUser(response);
      }, () => {
        this.authService.deslogar();
        this.alunoService.setUser(null);
      })
    }
  }

  triggerEvent(e: any, input: any) {
    if (!e) {
      input.value = ''
      this.filtrarEstado(input)
    }
  }

  filtrarEstado(filtro: any) {
    const valor: string = filtro.value;
    this.listaEstadosFiltradas = this.listaEstados.filter((e: any) => this.removerAcentos(e.nome).toLowerCase().includes(this.removerAcentos(valor).toLowerCase()));
  }

  carregarCursos(){
    this.cursoService.home().subscribe((response)=>{
      this.cursos = response
    })
  }

  cadastrar(form: NgForm) {
    if (form.valid && this.usuario.registryType != undefined && this.leiProtecaoDados && this.informarPdpTdu) {
      this.spinnerLoad = true;
      this.usuario.agree = this.receberInformacoesTerapiaCelular;
      this.loginService.register(this.usuario).subscribe((response) => {
        // this.spinnerLoad = false;
        // this.dialogService.genericoDialog('Cadastro concluído', 'Cadastro feito com sucesso, aguarde a aprovação para entrar no sistema.', true).afterClosed().subscribe((response) => {
        //   window.location.reload();
        // })
        this.authService.setUser(response);
        this.alunoService.setUser(response);
        window.location.reload();
      }, (error) => {
        this.spinnerLoad = false;
        if (error.status == 401) {
          form.controls['email'].setErrors({'emailExiste': true})
        }
      });
    } else {
      this.toastrService.error('Por favor, verique se os campos foram preenchidos corretamente', 'Erro ao se inscrever');
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
    if (letraMinusculo.test(senha))
      this.senhaForca++;
    if (letraMaiusculo.test(senha))
      this.senhaForca++;
    if (digito.test(senha))
      this.senhaForca++;
    if (caracterEspecial.test(senha))
      this.senhaForca++;
    if (tamanho8.test(senha))
      this.senhaForca++;
  }

  medidorDeForca(valor: number) {
    if (valor >= 5)
      return 'Muito Forte';
    if (valor == 4)
      return 'Forte';
    if (valor == 3 || valor == 2)
      return 'Médio';
    return 'Fraco';
  }

  setSenhasDiferentes(e: NgModel) {
    if(e.dirty){
      if (this.usuario.password == this.usuario.confirmPassword)
        e.control.setErrors(null)
      else
        e.control.setErrors({'senhasDiferentes': true});
    }
  }

  validarEmail(email: NgModel) {
    const re = /\S+@\S+\.\S+/;
    const resultado = re.test(email.control.value);
    if (!resultado) {
      email.control.setErrors({ emailInvalido: true })
      return false;
    }
    email.control.setErrors(null)
    return true;
  }
}
